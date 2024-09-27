class TypeDef {
    constructor() {
        this.ManeuverIndicator = {
            NotAvailable: 0,
            NoSpecialMneuver: 1,
            SpecialManeuver: 2
        }
        this.NavigationStatus = {
            UnderWayUsingEngine: 0,
            AtAnchor: 1,
            NotUnderCommand: 2,
            RestrictedManoeuverability: 3,
            ConstrainedByHerDraught: 4,
            Moored: 5,
            Aground: 6,
            EngagedInFishing: 7,
            UnderWaySailing: 8,
            ReservedForFutureAmendmentOfNavigationalStatusForHSC: 9,
            ReservedForFutureAmendmentOfNavigationalStatusForWIG: 10,
            AIS_SARTIsActive: 14,
            NotDefined: 15
        }
        this.Ship_CargoType = {
            // Not available (default)
            NotAvailable: 0,
            // Reserved for future use: 1-19
            // Wing in ground (WIG), all ships of this type
            WigAll: 20,
            // Wing in ground (WIG), Hazardous category A
            WigCategoryA: 21,
            // Wing in ground (WIG), Hazardous category B
            WigCategoryB: 22,
            // Wing in ground (WIG), Hazardous category C
            WigCategoryC: 23,
            // Wing in ground (WIG), Hazardous category D
            WigCategoryD: 24,
            // Wing in ground (WIG), Reserved for future use
            WigCategoryReserved1: 25,
            // Wing in ground (WIG), Reserved for future use
            WigCategoryReserved2: 26,
            // Wing in ground (WIG), Reserved for future use
            WigCategoryReserved3: 27,
            // Wing in ground (WIG), Reserved for future use
            WigCategoryReserved4: 28,
            // Wing in ground (WIG), Reserved for future use
            WigCategoryReserved5: 29,
            // Fishing
            Fishing: 30,
            // Towing
            Towing: 31,
            // Towing: length exceeds 200m or breadth exceeds 25m
            TowingLengths200Breadth25: 32,
            // Dredging or underwater ops
            Dredging: 33,
            // Diving ops
            Diving: 34,
            // Military ops
            Military: 35,
            // Sailing
            Sailing: 36,
            // Pleasure Craft
            PleasureCraft: 37,
            // Reserved
            Reserved1: 38,
            // Reserved
            Reserved2: 39,
            // High speed craft (HSC), all ships of this type
            HscAll: 40,
            // High speed craft (HSC), Hazardous category A
            HscCategoryA: 41,
            // High speed craft (HSC), Hazardous category B
            HscCategoryB: 42,
            // High speed craft (HSC), Hazardous category C
            HscCategoryC: 43,
            // High speed craft (HSC), Hazardous category D
            HscCategoryD: 44,
            // High speed craft (HSC), Reserved for future use
            HscReserved1: 45,
            // High speed craft (HSC), Reserved for future use
            HscReserved2: 46,
            // High speed craft (HSC), Reserved for future use
            HscReserved3: 47,
            // High speed craft (HSC), Reserved for future use
            HscReserved4: 48,
            // High speed craft (HSC), No additional information
            HscNoAdditional: 49,
            // Pilot Vessel
            Pilot: 50,
            // Search and Rescue vessel
            SearchRescue: 51,
            // Tug
            Tug: 52,
            // Port Tender
            PortTender: 53,
            // Anti-pollution equipment
            AntiPollutionEquipment: 54,
            // Law Enforcement
            LawEnforcement: 55,
            // Spare - Local Vessel
            SpareLocal1: 56,
            // Spare - Local Vessel
            SpareLocal2: 57,
            // Medical Transport
            MedicalTransport: 58,
            // Noncombatant ship according to RR Resolution No. 18
            Noncombatant: 59,
            // Passenger, all ships of this type
            PassengerAll: 60,
            // Passenger, Hazardous category A
            PassengerCategoryA: 61,
            // Passenger, Hazardous category B
            PassengerCategoryB: 62,
            // Passenger, Hazardous category C
            PassengerCategoryC: 63,
            // Passenger, Hazardous category D
            PassengerCategoryD: 64,
            // Passenger, Reserved for future use
            PassengerReserved1: 65,
            // Passenger, Reserved for future use
            PassengerReserved2: 66,
            // Passenger, Reserved for future use
            PassengerReserved3: 67,
            // Passenger, Reserved for future use
            PassengerReserved4: 68,
            // Passenger, No additional information
            PassengerNoAdditional: 69,
            // Cargo, all ships of this type
            CargoAll: 70,
            // Cargo, Hazardous category A
            CargoCategoryA: 71,
            // Cargo, Hazardous category B
            CargoCategoryB: 72,
            // Cargo, Hazardous category C
            CargoCategoryC: 73,
            // Cargo, Hazardous category D
            CargoCategoryD: 74,
            // Cargo, Reserved for future use
            CargoReserved1: 75,
            // Cargo, Reserved for future use
            CargoReserved2: 76,
            // Cargo, Reserved for future use
            CargoReserved3: 77,
            // Cargo, Reserved for future use
            CargoReserved4: 78,
            // Cargo, No additional information
            CargoNoAdditional: 79,
            // Tanker, all ships of this type
            TankerAll: 80,
            // Tanker, Hazardous category A
            TankerCategoryA: 81,
            // Tanker, Hazardous category B
            TankerCategoryB: 82,
            // Tanker, Hazardous category C
            TankerCategoryC: 83,
            // Tanker, Hazardous category D
            TankerCategoryD: 84,
            // Tanker, Reserved for future use
            TankerReserved1: 85,
            // Tanker, Reserved for future use
            TankerReserved2: 86,
            // Tanker, Reserved for future use
            TankerReserved3: 87,
            // Tanker, Reserved for future use
            TankerReserved4: 88,
            // Tanker, No additional information
            TankerNoAdditional: 89,
            // Other Type, all ships of this type
            OtherAll: 90,
            // Other Type, Hazardous category A
            OtherCategoryA: 91,
            // Other Type, Hazardous category B
            OtherCategoryB: 92,
            // Other Type, Hazardous category C
            OtherCategoryC: 93,
            // Other Type, Hazardous category D
            OtherCategoryD: 94,
            // Other Type, Reserved for future use
            OtherReserved1: 95,
            // Other Type, Reserved for future use
            OtherReserved2: 96,
            // Other Type, Reserved for future use
            OtherReserved3: 97,
            // Other Type, Reserved for future use
            OtherReserved4: 98,
            // Other Type, no additional information
            OtherNoAdditional: 99
        };
        this.EPFD = {
            undefined: 0,
            GPS: 1,
            GNSS: 2,
            COMBINED: 3,
            LoranC: 4,
            Chayka: 5,
            IntegratedNavigationSystem: 6,
            surveyed: 7,
            Galileo: 8,
            InternalGNSS: 15
        };
        this.Talker = {
            AB: 0,
            AD: 1,
            AI: 2,
            AN: 3,
            AR: 4,
            AS: 5,
            AT: 6,
            AX: 7,
            BS: 8,
            SA: 9
        }
    }





}


export { TypeDef }