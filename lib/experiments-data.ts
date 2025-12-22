export interface LayoutItem {
    id: string;
    type: "text" | "image";
    content: string;
}

export interface Experiment {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    image: string;
    tags?: string[];
    featured?: boolean;
    layout?: LayoutItem[];
}
