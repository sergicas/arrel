
import { Battery, Moon, Coffee, Brain, Clock, Pill, BookOpen } from 'lucide-react';

export const resourcesData = [
    // --- ENERGIA ---
    {
        id: 1,
        title: "Tipología circadiana y salud mental",
        category: "energia",
        type: "article",
        icon: Battery,
        summary: "Un estudi profund sobre com el teu cronotip (alosa vs. mussol) influeix directament en la teva predisposició a l'ansietat i la depressió.",
        takeaways: [
            "Els 'mussols' (vespertins) tenen major risc de transtorns de l'ànim.",
            "Alinea els teus horaris amb el teu ritme natural per millorar la salut mental.",
            "La llum del matí és el millor antidepressiu natural."
        ],
        readTime: "Estudi",
        url: "http://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S0212-97282014000300021"
    },
    {
        id: 101,
        title: "Glucosa, Fructosa y Metabolismo",
        category: "energia",
        type: "article",
        icon: BookOpen,
        summary: "Investigació recent del CIBER-ISCIII que desmunta mites sobre els sucres i explica com impacten diferentment en el fetge i el teixit adipós.",
        takeaways: [
            "La fructosa líquida és el sucre més nociu pel fetge.",
            "Els pics de glucosa constant esgoten la teva energia diària.",
            "L'ordre dels aliments altera l'absorció del sucre."
        ],
        readTime: "Article",
        url: "https://www.ciberisciii.es/noticias/glucosa-o-fructosa-nuevo-estudio-sobre-el-impacto-del-azucar-en-el-metabolismo-y-la-salud-cardiovascular"
    },
    // --- SON ---
    {
        id: 4,
        title: "Higiene del sueño: revisión",
        category: "son",
        type: "article",
        icon: Moon,
        summary: "Una revisió exhaustiva de les intervencions científiques més efectives per millorar la qualitat del son sense medicació.",
        takeaways: [
            "L'habitació ha d'estar completament fosca i fresca (18-20°C).",
            "Evitar pantalles 2 hores abans és la intervenció més potent.",
            "La regularitat en l'hora de llevar-se fixa el ritme de tot el dia."
        ],
        readTime: "Revisió",
        url: "http://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S1699-695X2017000300170"
    },
    {
        id: 202,
        title: "Yoga Nidra: Cambios Cerebrales",
        category: "son",
        type: "article",
        icon: Brain,
        summary: "Primer estudi d'imatge cerebral que demostra com el 'son conscient' (NSDR) regenera els nivells de dopamina al cervell.",
        takeaways: [
            "20 minuts de Yoga Nidra equivalen a 90 minuts de son profund.",
            "Augmenta la dopamina disponible fins a un 65%.",
            "Eina clau per recuperar-se de nits dolentes."
        ],
        readTime: "Estudi",
        url: "https://home.iitd.ac.in/show.php?id=237&in_sections=Press"
    },
    // --- NUTRICIÓ ---
    {
        id: 3,
        title: "Ayuno intermitente i salut",
        category: "nutricio",
        type: "article",
        icon: Coffee,
        summary: "Anàlisi dels escenaris clínics on el dejuni intermitent ha demostrat beneficis clars més enllà de la pèrdua de pes.",
        takeaways: [
            "Activa l'autofàgia (neteja cel·lular) a partir de les 16 hores.",
            "Redueix la inflamació sistèmica crònica.",
            "No és per a tothom: dones i persones amb estrès alt han de vigilar."
        ],
        readTime: "Revisió",
        url: "http://scielo.isciii.es/scielo.php?script=sci_arttext&pid=S0212-16112024000100026"
    },
    // --- ATENCIÓ ---
    {
        id: 401,
        title: "Neurociencia de la concentración",
        category: "atencio",
        type: "article",
        icon: Brain,
        summary: "Com funciona el circuit de l'atenció al cervell i 7 estratègies basades en evidència per 'hackejar-lo' i entrar en flux.",
        takeaways: [
            "El cervell només pot sostenir atenció focalitzada real durant 90 minuts.",
            "L'atenció visual lidera l'atenció cognitiva (mira un punt fix).",
            "El soroll blanc pot augmentar la dopamina tònica."
        ],
        readTime: "Article",
        url: "https://blog.cognifit.com/es/7-formas-eficaces-de-apoyar-la-concentracion-segun-la-neurociencia/"
    },
    // --- LONGEVITAT ---
    {
        id: 501,
        title: "Estilo de vida y envejecimiento",
        category: "temps",
        type: "article",
        icon: Clock,
        summary: "El titular impactant: només el 30% de la teva longevitat és genètica. El 70% restant depèn de què fas cada dia.",
        takeaways: [
            "L'epigenètica modula l'expressió dels teus gens.",
            "L'exercici de força és el correlat més fort amb l'esperança de vida.",
            "Les relacions socials fortes protegeixen el cervell."
        ],
        readTime: "Article",
        url: "https://www.infobae.com/generacion-silver/2025/10/17/el-70-del-envejecimiento-depende-del-estilo-de-vida-advierte-una-experta-en-longevidad/"
    },
    // --- SUPLEMENTS ---
    {
        id: 601,
        title: "Magnesio y salud cardiovascular",
        category: "suplements",
        type: "article",
        icon: Pill,
        summary: "Per què el magnesi és l'oblit de la medicina moderna i com la seva deficiència afecta el cor i el sistema nerviós.",
        takeaways: [
            "El 70% de la població té dèficit subclínic de magnesi.",
            "Essencial per a més de 300 reaccions enzimàtiques.",
            "Millora la qualitat del son profund i redueix palpitacions."
        ],
        readTime: "Revisió",
        url: "https://www.reccardioclinics.org/es-niveles-magnesio-enfermedad-cardiovascular-revision-articulo-S2605153220300856"
    },
    {
        id: 603,
        title: "Riesgos y beneficios del NMN",
        category: "suplements",
        type: "article",
        icon: Pill,
        summary: "El NMN s'ha posat de moda com a 'píndola de la joventut'. Què hi ha de veritat i què és màrqueting?",
        takeaways: [
            "Augmenta els nivells de NAD+, essencial per l'energia cel·lular.",
            "Potencia la funció mitocondrial en ratolins.",
            "L'evidència en humans encara és preliminar però prometedora."
        ],
        readTime: "Video",
        url: "https://nutritionfacts.org/es/video/riesgos-y-beneficios-de-la-nicotinamida-mononucleotida-na-potenciadora-del-nad/"
    }
];
