import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { SabreDriverService } from '../sabre-driver/sabre-driver.service';
import { SabrePayloadService } from '../sabre-payload/sabre-payload.service';
import { SabreAuthService } from '../sabre-auth/sabre-auth.service';

@Injectable()
export class SabreFlightItinerariesService extends SabreDriverService {
  constructor(
    private readonly sabreAuthService: SabreAuthService,
    private readonly sabrePayloadService: SabrePayloadService,
  ) {
    super();
  }
  async bargainFinderMaxResponse(request): Promise<any> {
    try {
      const authorization = await this.sabreAuthService.sabreAuthToken();
// console.log(authorization)
//       const response = await this.doRequest(
//         'post',
//         authorization,
//         this.sabrePayloadService.hotelRequest(request),
//         'v5/get/hotelavail',
//       );
// console.log(response)
      // response.GetHotelAvailRS.ApplicationResults.Error.forEach(function (errors){
      //   console.log(errors.SystemSpecificResults)
      //   errors.SystemSpecificResults.forEach(function (error){
      //   console.log(error);
      //   });
      // });
      // response.GetHotelAvailRS.ApplicationResults.Warning.forEach(function (Warnings){
      //   Warnings.SystemSpecificResults.forEach(function (Warning){
      //     console.log(Warning);
      //   })
      //
      // });
      // response.GetHotelAvailRS.HotelAvailInfos.forEach(function (HotelAvailInfos){
      //
      // });
      // console.log(response.GetHotelAvailRS.HotelAvailInfos.HotelAvailInfo)



      const response = await this.doRequest(
        'post',
        authorization,
        this.sabrePayloadService.availabilityRequest(request),
        'v4/offers/shop',
        );
        // console.log('response', response);
        if (
          response['groupedItineraryResponse'] !== undefined &&
          response['groupedItineraryResponse']['statistics']['itineraryCount'] !=
            0
        ) {
          const groupedItineraryResponse = response['groupedItineraryResponse'];
          const scheduleDescs = this.__scheduleDescs(
            groupedItineraryResponse['scheduleDescs'],
          );
          // const taxDescs = this.taxDescs(groupedItineraryResponse['taxDescs']);
          // const taxSummaryDescs = this.taxSummaryDescs(
          //   groupedItineraryResponse['taxSummaryDescs'],
          // );
          const fareComponentDescs = this.__fareComponentDescs(
            groupedItineraryResponse['fareComponentDescs'],
          );
          const baggageAllowanceDescs = this.__baggageAllowanceDescs(
            groupedItineraryResponse['baggageAllowanceDescs'],
          );
          const legDescs = this.__legDescs(
            groupedItineraryResponse['legDescs'],
            scheduleDescs,
          );
          return JSON.stringify(
            this.__itineraryGroups(
              request,
              groupedItineraryResponse['itineraryGroups'],
              legDescs,
              baggageAllowanceDescs,
              fareComponentDescs,
            ),
          );
        }
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  __itineraryGroups(
    request,
    groupedItineraryResponse,
    legDescs,
    baggageAllowanceDescs,
    fareComponentDescs,
  ) {
    const flightItineraries = [];
    groupedItineraryResponse.forEach(function (itineraryGroup) {
      if (itineraryGroup !== undefined) {
        const legDescriptions =
          itineraryGroup['groupDescription']['legDescriptions'];
        console.log('legDescriptions', legDescriptions);
        itineraryGroup['itineraries'].forEach(function (itineraryGroup) {
          const price = {};
          let baggageAllowances = [];
          const fareComponentSegmentDetails = [];
          const fareComponentDescRefDetails = [];
          itineraryGroup['pricingInformation'].forEach(
            function (passengerInfolists) {
              const fare = passengerInfolists['fare'];
              let totalAmount: number = 0;
              let totalBaseFare: number = 0;
              let totalTaxes: number = 0;
              price['validatingCarrier'] = fare['validatingCarrierCode'];
              price['airlineName'] = 'airlineName';
              price['currencyCode'] = 'PKR';
              price['vendorType'] = 'Sabre';
              price['lastTicketDate'] =
                fare['lastTicketDate'] !== undefined
                  ? fare['lastTicketDate']
                  : new Date();
              price['isRefundable'] = 'false';
              fare['passengerInfoList'].forEach(function (passengerInfolist) {
                const passengerInfo = passengerInfolist['passengerInfo'];
                const passengerTotalFare = passengerInfo['passengerTotalFare'];
                const passengerType = passengerInfo['passengerType'];
                if (passengerInfo['fareComponents'] !== undefined) {
                  passengerInfo['fareComponents'].forEach(
                    function (fareComponent) {
                      const fareComponentDescDetail =
                        fareComponentDescs[fareComponent['ref']];
                      fareComponentDescRefDetails.push({
                        outboundDate: 'outboundDate',
                        departureCode: 'outboundDate',
                        arrivalCode: 'arrivalCode',
                        marketingCarrier: `${fareComponentDescDetail['governingCarrier']}`,
                        fareBasisCode: `${fareComponentDescDetail['fareBasisCode']}`,
                        passengerType: `${fareComponentDescDetail['farePassengerType']}`,
                      });
                      fareComponent['segments'].forEach(function (segment) {
                        if (!segment['segment']['bookingCode'] !== undefined) {
                          fareComponentSegmentDetails.push({
                            ref: fareComponent['ref'],
                            bookingCode: segment['segment']['bookingCode'],
                            mealCode: segment['segment']['mealCode']
                              ? segment['segment']['mealCode']
                              : '',
                            cabinCode: segment['segment']['cabinCode'],
                            seatsAvailable:
                              segment['segment']['seatsAvailable'],
                            availabilityBreak: !segment['segment'][
                              'availabilityBreak'
                            ]
                              ? segment['segment']['availabilityBreak']
                              : '',
                          });
                        }
                      });
                    },
                  );
                  // console.log({
                  //   fareComponentSegmentDetails: fareComponentSegmentDetails,
                  //   fareComponentDescRefDetails: fareComponentDescRefDetails,
                  // })
                }
                const allowances = [];
                if (passengerInfo['baggageInformation'] !== undefined) {
                  passengerInfo['baggageInformation'].forEach(
                    function (baggageInformation) {
                      if (
                        baggageInformation['allowance'] !== undefined &&
                        baggageInformation['allowance'] !== null
                      ) {
                        allowances.push({
                          allowance:
                            baggageAllowanceDescs[
                              baggageInformation['allowance']['ref']
                            ],
                          passengerType: passengerType,
                        });
                      }
                    },
                  );
                  baggageAllowances = allowances;
                }
                const parsonType =
                  passengerType == 'ADT'
                    ? 'Adult'
                    : passengerType == 'CNN'
                      ? 'Child'
                      : passengerType == 'INF'
                        ? 'Infant'
                        : 'Adult';
                price['pricePer' + parsonType] =
                  `${passengerTotalFare['totalFare']}`;
                price['baseFarePer' + parsonType] =
                  `${passengerTotalFare['equivalentAmount']}`;
                price['taxesPricePer' + parsonType] =
                  `${passengerTotalFare['totalTaxAmount']}`;
                totalAmount +=
                  Number(passengerTotalFare['totalFare']) *
                  Number(passengerInfo['passengerNumber']);
                totalBaseFare +=
                  Number(passengerTotalFare['equivalentAmount']) *
                  Number(passengerInfo['passengerNumber']);
                totalTaxes +=
                  Number(passengerTotalFare['totalTaxAmount']) *
                  Number(passengerInfo['passengerNumber']);
              });
              price['totalFare'] = `${totalAmount}`;
              price['totalBaseFare'] = `${totalBaseFare}`;
              price['totalTaxes'] = `${totalTaxes}`;
            },
          );
          let j = 0;
          const legs = {};
          const legBaggages = {};
          itineraryGroup['legs'].forEach(function (leg, legKey) {
            if (baggageAllowances !== undefined) {
              const oneWayBaggages = [];
              const returnBaggages = [];
              baggageAllowances.forEach(function (baggageAllowance) {
                if (legKey == 0) {
                  oneWayBaggages.push({
                    passengerType: `${baggageAllowance['passengerType']}`,
                    segment: `${legDescriptions[legKey]['departureLocation']} ${legDescriptions[legKey]['arrivalLocation']}`,
                    baggageAllowance: `${baggageAllowance['allowance']}`,
                    fareType: `${baggageAllowance['allowance']}`,
                  });
                } else {
                  if (baggageAllowance['passengerType'] !== undefined) {
                    returnBaggages.push({
                      passengerType: `${baggageAllowance['passengerType']}`,
                      segment: `${legDescriptions[legKey]['departureLocation']} ${legDescriptions[legKey]['arrivalLocation']}`,
                      baggageAllowance: `${baggageAllowance['allowance']}`,
                      fareType: `${baggageAllowance['allowance']}`,
                    });
                  }
                }
              });
              if (legKey == 0) {
                legBaggages['leg' + (legKey + 1)] = {
                  segments: JSON.stringify(oneWayBaggages),
                };
              } else {
                legBaggages['leg' + (legKey + 1)] = {
                  segments: JSON.stringify(returnBaggages),
                };
              }
            }
            const segments = [];
            let fareComponentSegmentInfo = [];
            let departureDateAdjustment: number = 0;
            let departureAirport = '';
            let departureAirportCode = '';
            let departureDateTime = '';
            let pointAirports = '';
            let arrivalAirport = '';
            let arrivalAirportCode = '';
            let arrivalDateTime = '';
            const durationTime = 0;
            const arrivalTimes = [];
            const departureTimes = [];
            const marketingAirlines = [];
            const operatingAirlines = [];
            const hiddenStops = [];
            let legSegmentInfo = [];
            legDescs[leg['ref']]['legs'].forEach(
              function (legDesc, legDescKey) {
                fareComponentSegmentInfo = fareComponentSegmentDetails[j];
                legSegmentInfo = legDesc['legDesc'];
                legSegmentInfo['cabin'] =
                  fareComponentSegmentInfo['cabinCode'] !== ''
                    ? fareComponentSegmentInfo['cabinCode']
                    : '';
                legSegmentInfo['className'] =
                  fareComponentSegmentInfo['cabinCode'] === 'Y'
                    ? 'ECONOMY'
                    : fareComponentSegmentInfo['cabinCode'] === 'S'
                      ? 'PREMIUM ECONOMY'
                      : fareComponentSegmentInfo['cabinCode'] === 'C'
                        ? 'FIRST'
                        : 'ECONOMY';
                legSegmentInfo['departure']['departureDateTime'] = moment(
                  `${legDescriptions[legKey]['departureDate']}T${legSegmentInfo['departure']['dateTime']}`,
                )
                  .add(Number(legDesc['departureDateAdjustment']), 'days')
                  .format();
                legSegmentInfo['arrival']['arrivalDateTime'] = moment(
                  `${legDescriptions[legKey]['departureDate']}T${legSegmentInfo['arrival']['dateTime']}`,
                )
                  .add(Number(legDesc['departureDateAdjustment']), 'days')
                  .format();
                legSegmentInfo['bookingCode'] =
                  fareComponentSegmentInfo['bookingCode'] !== ''
                    ? fareComponentSegmentInfo['bookingCode']
                    : '';
                legSegmentInfo['mealCode'] =
                  fareComponentSegmentInfo['mealCode'] !== ''
                    ? fareComponentSegmentInfo['mealCode']
                    : '';
                legSegmentInfo['seatsAvailable'] =
                  fareComponentSegmentInfo['seatsAvailable'] !== ''
                    ? fareComponentSegmentInfo['seatsAvailable']
                    : '';
                const legRefDescKeys = Object.keys(
                  legDescs[leg['ref']]['legs'],
                );
                if (legDescKey == legRefDescKeys[0]) {
                  departureDateTime =
                    legSegmentInfo['departure']['departureDateTime'];
                  departureAirport = legSegmentInfo['departure']['airport'];
                  departureAirportCode = legSegmentInfo['departure']['code'];
                  departureDateAdjustment = Number(
                    legDesc['departureDateAdjustment'],
                  );
                  arrivalTimes.push(
                    legSegmentInfo['arrival']['arrivalDateTime'],
                  );
                } else {
                  pointAirports += legSegmentInfo['departure']['code'] + '';
                }
                if (
                  legDescKey != legRefDescKeys[0] &&
                  legDescKey != legRefDescKeys[legRefDescKeys.length - 1]
                ) {
                  departureTimes.push(
                    legSegmentInfo['departure']['departureDateTime'],
                  );
                  arrivalTimes.push(
                    legSegmentInfo['arrival']['arrivalDateTime'],
                  );
                }
                if (legDescKey == legRefDescKeys[legRefDescKeys.length - 1]) {
                  arrivalAirport = legSegmentInfo['arrival']['code'];
                  arrivalAirportCode = legSegmentInfo['arrival']['code'];
                  arrivalDateTime =
                    legSegmentInfo['arrival']['arrivalDateTime'];
                  departureDateAdjustment = Number(
                    legDesc['departureDateAdjustment'],
                  );
                  departureTimes.push(
                    legSegmentInfo['departure']['departureDateTime'],
                  );
                }
                marketingAirlines.push({
                  code: legSegmentInfo['marketing']['code'],
                  flightNumber: legSegmentInfo['marketing']['flightNumber'],
                });
                operatingAirlines.push({
                  code: legSegmentInfo['operating']['code'],
                  flightNumber: legSegmentInfo['operating']['flightNumber'],
                });
                hiddenStops.push(legDesc['hiddenStops']);
                segments.push(legSegmentInfo);
                j++;
              },
            );
            legs['leg' + (legKey + 1)] = {
              elapsedTime: `${durationTime}`,
              operatingAirlines: operatingAirlines,
              marketingAirlines: marketingAirlines,
              departureAirport: `${departureAirport}`,
              departureAirportCode: `${departureAirportCode}`,
              departureDateTime: `${departureDateTime}`,
              pointAirports: `${pointAirports ? pointAirports : 'Direct'}`,
              arrivalAirport: `${arrivalAirport}`,
              arrivalAirportCode: `${arrivalAirportCode}`,
              arrivalDateTime: `${arrivalDateTime}`,
              dateAdjustment:
                departureDateAdjustment == 0
                  ? `same day`
                  : departureDateAdjustment == 1
                    ? `next day`
                    : departureDateAdjustment + `days`,
              stopovers: '',
              longStopover: '',
              segment: segments,
            };
          });
          flightItineraries.push({
            passengers: {
              adultsCount:
                request.adultsCount != null ? request.adultsCount : 1,
              childrenCount:
                request.childrenCount != null ? request.childrenCount : 0,
              infantsCount:
                request.adultsCount != null ? request.infantsCount : 0,
            },
            price: price,
            baggages: '',
            legs: legs,
          });
        });
      }
    });
    return flightItineraries;
  }

  __scheduleDescs(scheduleDescs) {
    const legs = [];
    const hiddenStops = [];
    if (scheduleDescs.length !== 0) {
      scheduleDescs.forEach(function (scheduleDesc) {
        legs[scheduleDesc['id']] = {
          cabin: '',
          className: '',
          flightNumber: scheduleDesc['carrier']['marketingFlightNumber']
            ? `${scheduleDesc['carrier']['marketingFlightNumber']}`
            : `${scheduleDesc['carrier']['operatingFlightNumber']}`,
          departure: {
            code: scheduleDesc['departure']['airport']
              ? `${scheduleDesc['departure']['airport']}`
              : '',
            city: scheduleDesc['departure']['city']
              ? `${scheduleDesc['departure']['city']}`
              : '',
            airport: scheduleDesc['departure']['country']
              ? `${scheduleDesc['departure']['airport']},${scheduleDesc['departure']['city']},${scheduleDesc['departure']['country']}`
              : '',
            terminal: scheduleDesc['departure']['terminal']
              ? `${scheduleDesc['departure']['terminal']}`
              : '',
            dateTime: scheduleDesc['departure']['time']
              ? `${scheduleDesc['departure']['time']}`
              : '',
            dateAdjustment: scheduleDesc['departure']['dateAdjustment']
              ? `${scheduleDesc['departure']['dateAdjustment']}`
              : 0,
          },
          arrival: {
            code: scheduleDesc['arrival']['airport']
              ? `${scheduleDesc['arrival']['airport']}`
              : '',
            city: scheduleDesc['arrival']['city']
              ? `${scheduleDesc['arrival']['city']}`
              : '',
            airport: scheduleDesc['arrival']['country']
              ? `${scheduleDesc['arrival']['airport']},${scheduleDesc['arrival']['city']},${scheduleDesc['arrival']['country']}`
              : '',
            terminal: scheduleDesc['arrival']['terminal']
              ? `${scheduleDesc['arrival']['terminal']}`
              : '',
            dateTime: scheduleDesc['arrival']['time']
              ? `${scheduleDesc['arrival']['time']}`
              : '',
            dateAdjustment: scheduleDesc['arrival']['dateAdjustment']
              ? `${scheduleDesc['arrival']['dateAdjustment']}`
              : 0,
          },
          equipment: `${scheduleDesc['carrier']['equipment']['code']}${scheduleDesc['carrier']['equipment']['typeForFirstLeg']}${scheduleDesc['carrier']['equipment']['typeForLastLeg']}`,
          elapsedTime: `${scheduleDesc['elapsedTime']}`,
          duration: `${scheduleDesc['elapsedTime']}`,
          marketing: {
            code: scheduleDesc['carrier']['marketing']
              ? `${scheduleDesc['carrier']['marketing']}`
              : `${scheduleDesc['carrier']['operating']}`,
            flightNumber: scheduleDesc['carrier']['marketingFlightNumber']
              ? `${scheduleDesc['carrier']['marketingFlightNumber']}`
              : `${scheduleDesc['carrier']['operatingFlightNumber']}`,
          },
          operating: {
            code: scheduleDesc['carrier']['operating']
              ? `${scheduleDesc['carrier']['operating']}`
              : `${scheduleDesc['carrier']['marketing']}`,
            flightNumber: scheduleDesc['carrier']['operatingFlightNumber']
              ? `${scheduleDesc['carrier']['operatingFlightNumber']}`
              : `${scheduleDesc['carrier']['marketingFlightNumber']}`,
          },
          smokingAllowed: 'false',
          specialMeal: '',
          mealCode: '',
          seatsAvailable: '',
          stopCount: scheduleDesc['stopCount'] ? scheduleDesc['stopCount'] : 0,
        };
        if (scheduleDesc['hiddenStops'] !== undefined) {
          const stops = [];
          scheduleDesc['hiddenStops'].forEach(function (hiddenStop) {
            stops.push({
              airport: hiddenStop['airport'],
              airportCity: '',
              airportCode: '',
              arrivalTime: `${hiddenStop['arrivalTime']}`,
              departureTime: `${hiddenStop['departureTime']}`,
              durationTime: `${hiddenStop['elapsedTime']}`,
              elapsedLayoverTime: `${hiddenStop['elapsedLayoverTime']}`,
              aircraftCode: `${hiddenStop['equipment']}`,
            });
          });
          hiddenStops[scheduleDesc['id']] = stops;
        }
      });
    }
    return { legs: legs, hiddenStops: hiddenStops };
  }

  __fareComponentSegments(fareComponents, fareComponentDescs) {
    if (fareComponents !== undefined) {
      const fareComponentSegmentDetails = [];
      const fareComponentDescRefDetails = [];
      fareComponents.forEach(function (fareComponent) {
        const fareComponentDescDetail =
          fareComponentDescs[fareComponent['ref']];
        fareComponentDescRefDetails.push({
          outboundDate: 'outboundDate',
          departureCode: 'outboundDate',
          arrivalCode: 'arrivalCode',
          marketingCarrier: `${fareComponentDescDetail['governingCarrier']}`,
          fareBasisCode: `${fareComponentDescDetail['fareBasisCode']}`,
          passengerType: `${fareComponentDescDetail['farePassengerType']}`,
        });
        fareComponent['segments'].forEach(function (segment) {
          if (!segment['segment']['bookingCode'] !== undefined) {
            fareComponentSegmentDetails.push({
              ref: fareComponent['ref'],
              bookingCode: segment['segment']['bookingCode'],
              mealCode: segment['segment']['mealCode']
                ? segment['segment']['mealCode']
                : '',
              cabinCode: segment['segment']['cabinCode'],
              seatsAvailable: segment['segment']['seatsAvailable'],
              availabilityBreak: !segment['segment']['availabilityBreak']
                ? segment['segment']['availabilityBreak']
                : '',
            });
          }
        });
      });
      return {
        fareComponentSegmentDetails: fareComponentSegmentDetails,
        fareComponentDescRefDetails: fareComponentDescRefDetails,
      };
    }
  }

  __taxDescs(taxDescs) {
    const taxes = [];
    if (taxDescs !== undefined && taxDescs.length !== 0) {
      taxDescs.forEach(function (taxDesc) {
        taxes[taxDesc['id']] = taxDesc['code'] + '.' + taxDesc['amount'];
      });
    }
    return { taxes: taxes };
  }
  __taxSummaryDescs(taxSummaryDescs) {
    const taxes = [];
    if (taxSummaryDescs !== undefined && taxSummaryDescs.length !== 0) {
      taxSummaryDescs.forEach(function (taxSummaryDesc) {
        taxes[taxSummaryDesc['id']] =
          taxSummaryDesc['code'] + '.' + taxSummaryDesc['amount'];
      });
    }
    return { taxes: taxes };
  }
  __fareComponentDescs(fareComponentDescs) {
    if (fareComponentDescs !== undefined) {
      const fareComponents = [];
      fareComponentDescs.forEach(function (fareComponentDesc) {
        fareComponents[fareComponentDesc['id']] = fareComponentDesc;
      });
      return fareComponents;
    }
  }

  __baggageAllowanceDescs(baggageAllowanceDescs) {
    const baggages = [];
    if (baggageAllowanceDescs !== undefined) {
      baggageAllowanceDescs.forEach(function (baggageAllowanceDesc) {
        baggages[baggageAllowanceDesc['id']] =
          baggageAllowanceDesc['pieceCount'] !== undefined
            ? baggageAllowanceDesc['pieceCount'] +
              ' ' +
              (baggageAllowanceDesc['pieceCount'] === 1 ? 'piece' : 'pieces')
            : baggageAllowanceDesc['weight'] +
              ' ' +
              baggageAllowanceDesc['unit'];
      });
    }
    return baggages;
  }
  __legDescs(legDescs, scheduleDescs) {
    const legs = [];
    legDescs.forEach(function (legDesc) {
      const leg = [];
      const scheduleRefs = [];
      legDesc['schedules'].forEach(function (schedule) {
        leg.push({
          legDescId: legDesc['id'],
          scheduleRef: schedule['ref'],
          legDesc: scheduleDescs['legs'][schedule['ref']],
          hiddenStops: scheduleDescs['hiddenStops'][schedule['ref']],
          departureDateAdjustment: schedule['departureDateAdjustment']
            ? schedule['departureDateAdjustment']
            : 0,
        });
        scheduleRefs.push(schedule['ref']);
      });
      legs[legDesc['id']] = {
        legDescId: legDesc['id'],
        scheduleRefs: scheduleRefs,
        elapsedTime: legDesc['elapsedTime'],
        legs: leg,
      };
    });
    return legs;
  }
  __taxes(taxDescs, taxes) {
    console.log(taxDescs);
    if (taxes !== undefined) {
      let taxLists = '';
      taxes.forEach(function (tax) {
        taxLists += taxDescs[tax['ref']] + ' ';
      });
      return taxLists;
    }
  }
}
