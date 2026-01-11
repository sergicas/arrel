export const diagnosisQuestions = [
    // BLOC A: ENERGIA (Cos que envelleix)
    {
        id: 1,
        variable: 'energy',
        block: 'Energia',
        question: "Quan al llarg del dia notes la primera caiguda clara d’energia?",
        options: [
            { label: "Mai, la mantenc estable", score: 2 },
            { label: "A mitja tarda, però recupero", score: 1 },
            { label: "Després de dinar, i ja no remunto", score: -1 },
            { label: "Em llevo ja sense bateria", score: -2 }
        ]
    },
    {
        id: 2,
        variable: 'energy',
        block: 'Energia',
        question: "Depens de substàncies (cafè, sucre) per funcionar?",
        options: [
            { label: "No, tinc energia natural", score: 2 },
            { label: "Un cafè al matí i prou", score: 1 },
            { label: "Necessito anar picant o bevent cafè", score: -1 },
            { label: "Sense estimulants no soc persona", score: -2 }
        ]
    },

    // BLOC NOU: SON 🌙
    {
        id: 3,
        variable: 'sleep',
        block: 'SON 🌙',
        question: "Quantes hores dorms de mitjana per nit?",
        options: [
            { label: "7-9 hores consistentment", score: 2 },
            { label: "6-7 hores la majoria de nits", score: 1 },
            { label: "5-6 hores habituals", score: -1 },
            { label: "Menys de 5 hores o més de 9 irregularment", score: -2 }
        ]
    },
    {
        id: 4,
        variable: 'sleep',
        block: 'SON 🌙',
        question: "Com et despertes al matí?",
        options: [
            { label: "Descansat, sense alarma o amb alarma suau", score: 2 },
            { label: "Bé amb alarma", score: 1 },
            { label: "Cansat però funcional", score: -1 },
            { label: "Esgotat, costa molt aixecar-se", score: -2 }
        ]
    },
    {
        id: 5,
        variable: 'sleep',
        block: 'SON 🌙',
        question: "Et despertes durant la nit?",
        options: [
            { label: "Mai o molt rarament", score: 2 },
            { label: "Ocasionalment, torno a dormir fàcil", score: 1 },
            { label: "Diverses vegades, costa tornar a dormir", score: -1 },
            { label: "Múltiples despertars, son fragmentat", score: -2 }
        ]
    },

    // BLOC NOU: NUTRICIÓ 🥗
    {
        id: 6,
        variable: 'nutrition',
        block: 'NUTRICIÓ 🥗',
        question: "Quants àpats processats menges per setmana?",
        options: [
            { label: "Gairebé cap, cuino amb ingredients frescos", score: 2 },
            { label: "1-3 àpats processats per setmana", score: 1 },
            { label: "4-7 àpats processats per setmana", score: -1 },
            { label: "Més de la meitat dels àpats són processats", score: -2 }
        ]
    },
    {
        id: 7,
        variable: 'nutrition',
        block: 'NUTRICIÓ 🥗',
        question: "Menges verdures i fruites diàriament?",
        options: [
            { label: "Sí, 5+ racions al dia de colors variats", score: 2 },
            { label: "3-4 racions al dia", score: 1 },
            { label: "1-2 racions al dia", score: -1 },
            { label: "Molt poques o cap", score: -2 }
        ]
    },
    {
        id: 8,
        variable: 'nutrition',
        block: 'NUTRICIÓ 🥗',
        question: "Fas períodes de descans digestiu (dejuni nocturn)?",
        options: [
            { label: "Sí, sopo d'hora i deixo 12-14h", score: 2 },
            { label: "Ho intento, unes 10-12h", score: 1 },
            { label: "No, sovint menjo abans de dormir", score: -1 },
            { label: "Pico constantment fins a anar al llit", score: -2 }
        ]
    },

    // BLOC B: ATENCIÓ (Ment que s’esgota)
    {
        id: 9,
        variable: 'attention',
        block: 'Atenció',
        question: "Quanta estona seguida pots mantenir l’atenció sense fugir mentalment?",
        options: [
            { label: "Més d’una hora fàcilment", score: 2 },
            { label: "Uns 30 minuts", score: 1 },
            { label: "Em costa passar de 10 minuts", score: -1 },
            { label: "Salto constantment d’una cosa a l’altra", score: -2 }
        ]
    },
    {
        id: 10,
        variable: 'attention',
        block: 'Atenció',
        question: "Et costa recordar noms o detalls recents?",
        options: [
            { label: "Tinc una memòria esmolada", score: 2 },
            { label: "De vegades em despisto", score: 1 },
            { label: "Sovint tinc la paraula a la punta de la llengua", score: -1 },
            { label: "Em falla la memòria diàriament", score: -2 }
        ]
    },

    // BLOC C: TEMPS VISCUT (Envelliment subjectiu)
    {
        id: 11,
        variable: 'lived_time',
        block: 'Temps Viscut',
        question: "Tens la sensació que els dies et passen volant?",
        options: [
            { label: "No, gaudeixo cada moment", score: 2 },
            { label: "Una mica ràpid, però controlable", score: 1 },
            { label: "Sí, setmanes senceres desapareixen", score: -1 },
            { label: "La vida se m'escapa de les mans", score: -2 }
        ]
    },
    {
        id: 12,
        variable: 'lived_time',
        block: 'Temps Viscut',
        question: "Sents que el futur s’ha encongit o encara s’expandeix?",
        options: [
            { label: "S'expandeix, veig novetat", score: 2 },
            { label: "Es manté estable", score: 1 },
            { label: "Es comença a tancar", score: -1 },
            { label: "Ja està escrit", score: -2 }
        ]
    }
];
