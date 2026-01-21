import { TourConfig } from "@/types/tour";

export const SHOWROOM_TOUR: TourConfig = {
    steps: [
        {
            sweep: "iurrammyaagwqidiy5p4ga8sb",
            rotation: { x: -2.3478604858235603, y: 177.69234686168383 }, // We swap x/y if needed based on SDK behavior, usually horizontal is X
            title: "Der Startpunkt",
            description: "Willkommen am Eingang. Wische nach oben, um die Tour zu starten."
        },
        {
            sweep: "nqmw84qk1e6zrawn229sn3fka",
            rotation: { x: -4.92837490755395, y: -111.83698566573533 },
            title: "Zentrum des Raums",
            description: "Hier haben wir eine perfekte Übersicht über alle Exponate."
        },
        {
            sweep: "kqm98ufnhq0uskktfs7nuxdfd",
            rotation: { x: -8.857319074013537, y: 68.73459185503863 },
            title: "Detailansicht",
            description: "Schau dir die Konstruktion genau an. Beeindruckend, oder?"
        },
        {
            sweep: "iurrammyaagwqidiy5p4ga8sb",
            rotation: { x: -2.3478604858235603, y: 177.69234686168383 }, // We swap x/y if needed based on SDK behavior, usually horizontal is X
            title: "Zurück zum Anfang",
            description: "Wir sind wieder am Start. Danke für den Rundgang!"
        }
    ]
};
