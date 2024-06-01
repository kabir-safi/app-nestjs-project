import { Injectable } from '@nestjs/common';

@Injectable()
export class SabrePayloadService {
  hotelRequest(request) {
    return {
      GetHotelAvailRQ: {
        version: '5.0.0',
        POS: {
          Source: {
            PseudoCityCode: 'TM61',
          },
        },
        SearchCriteria: {
          OffSet: 2,
          SortBy: 'NegotiatedRateAvailability',
          SortOrder: 'DESC',
          PageSize: 200,
          TierLabels: false,
          RateDetailsInd: true,
          HotelRefs: {
            HotelRef: [
              {
                HotelCode: '1212',
                CodeContext: 'SABRE',
              },
            ],
          },
          RateInfoRef: {
            CurrencyCode: 'AUD',
            BestOnly: '2',
            PrepaidQualifier: 'ExcludePrepaid',
            StayDateTimeRange: {
              StartDate: '2024-06-20',
              EndDate: '2024-06-23',
            },
            RateRange: {
              Min: 0.1,
              Max: 10000,
            },
            Rooms: {
              Room: [
                {
                  Index: 1,
                  Adults: 2
                },
              ],
            },
            RatePlanCandidates: {
              ExactMatchOnly: false,
              RatePlanCandidate: [
                {
                  RatePlanType: '10',
                  RatePlanCode: 'IBM',
                },
              ],
            },
            LoyaltyIds: {
              LoyaltyId: ['HI58967', 'HL34534', 'BW463456'],
            },
            FrequentFlyerNumber: 'aqq77',
            CorpDiscount: '1267',
            RateSource: '100,111,112,110,113,130',
          },
          ImageRef: {
            Type: 'ORIGINAL',
            CategoryCode: 2,
            LanguageCode: 'EN',
          },
        },
      },
    };
  }
  availabilityRequest(request) {
    return {
      OTA_AirLowFareSearchRQ: {
        AvailableFlightsOnly: true,
        OriginDestinationInformation:
          this.originDestinationInformation(request),
        POS: {
          Source: [
            {
              FixedPCC: true,
              PseudoCityCode: 'X1CD',
              RequestorID: {
                CompanyName: {
                  Code: 'TN',
                },
                ID: '1',
                Type: '1',
              },
            },
          ],
        },
        ResponseType: 'GIR-JSON',
        ResponseVersion: 'V4',
        TPA_Extensions: {
          IntelliSellTransaction: {
            RequestType: {
              Name: '50ITINS',
            },
          },
        },
        TravelPreferences: {
          CabinPref: [
            {
              Cabin:
                request['cabin'] !== undefined && request['cabin'] !== ''
                  ? request['cabin']
                  : 'Y',
              PreferLevel: 'Preferred',
            },
          ],
          TPA_Extensions: {
            DataSources: {
              ATPCO: 'Enable',
              LCC: 'Enable',
              NDC: 'Enable',
            },
          },
        },
        TravelerInfoSummary: {
          AirTravelerAvail: [
            {
              PassengerTypeQuantity: this.travelerInfoSummary(request),
            },
          ],
          SeatsRequested: [this.seatsRequested(request)],
        },
        Version: 'V4',
      },
    };
  }
  originDestinationInformation(request) {
    const originDestinations = [];
    request['legs'].forEach(function (leg) {
      originDestinations.push({
        DepartureDateTime:
          (leg['outboundDate'] !== undefined && leg['outboundDate'] !== ''
            ? leg['outboundDate']
            : '') + 'T00:00:00',
        DestinationLocation: {
          LocationCode:
            leg['arrivalCode'] !== undefined && leg['arrivalCode'] !== ''
              ? leg['arrivalCode']
              : '',
        },
        OriginLocation: {
          LocationCode:
            leg['departureCode'] !== undefined && leg['departureCode'] !== ''
              ? leg['departureCode']
              : '',
        },
        TPA_Extensions: {
          Baggage: {
            FreeCarryOn: true,
            FreePieceRequired: true,
          },
          CabinPref: {
            Cabin:
              request['cabin'] !== undefined && request['cabin'] !== ''
                ? request['cabin']
                : 'Y',
            PreferLevel: 'Preferred',
          },
        },
      });
    });
    return originDestinations;
  }
  travelerInfoSummary(request) {
    const passengers = [];
    passengers.push({
      Code: 'ADT',
      Quantity:
        request['adultsCount'] != '' ? Number(request['adultsCount']) : 0,
    });
    if (request['childrenCount'] != '' && request['childrenCount'] != 0) {
      passengers.push({
        Code: 'CNN',
        Quantity: Number(request['childrenCount']),
      });
    }
    if (request['infantsCount'] != '' && request['infantsCount'] != 0) {
      passengers.push({
        Code: 'INF',
        Quantity: Number(request['infantsCount']),
      });
    }
    return passengers;
  }
  seatsRequested(request) {
    return (
      Number(request['adultsCount'] != '' ? request['adultsCount'] : 1) +
      Number(
        request['childrenCount'] != '' && request['childrenCount'] != 0
          ? request['childrenCount']
          : 0,
      ) +
      Number(
        request['infantsCount'] != '' && request['infantsCount'] != 0
          ? request['infantsCount']
          : 0,
      )
    );
  }
}
