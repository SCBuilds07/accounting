export const FINANCIEEL_CONFIG = {
    "Crediteuren": {
        koppen: [
            { id: "Crediteuren", link: "/financial/crediteuren" },
            { id: `Review`, link: "/financial/crediteuren-review" }
        ],
    },
    "Dagboek": {
        koppen: [
            { id: "Bankafschriften", link: "#" },
            { id: "Dagboek", link: "#" },
        ],
    },
    "Debiteuren": {
        koppen: [
            { id: "Debiteuren", link: "#" },
            { id: "Factureren", link: "#" },
        ],
    },
    "Facturen": {
        koppen: [
            { id: "Openstaande", link: "/financial/facturen" },
            { id: "Afgekeurde", link: "/financial/facturen/afgekeurd" },
            { id: "Postbus", link: "/financial/facturen/postbus" },
            { id: "Beoordelen", link: "/financial/facturen/beoordelen" },
            { id: "Archief", link: "/financial/facturen/archief"},
        ],
    }
}
