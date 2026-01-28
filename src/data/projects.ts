export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    link: string;
    className?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Xpat",
        category: "Recruitment Logic",
        image: "/images/xpat-cover.png",
        link: "https://xpat.com.my/"
    },
    {
        id: 2,
        title: "VisaFlowPro",
        category: "Immigration SaaS",
        image: "/images/visaflow-cover.png",
        className: "md:mt-12",
        link: "https://visaflowpro.web.app/"
    },
    {
        id: 3,
        title: "OTR Seccurio",
        category: "Security Dashboard",
        image: "/images/otr-cover.png",
        link: "https://otr.seccurio.com/"
    },
];
