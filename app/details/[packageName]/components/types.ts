
export interface PackageDetailProps {
    params: {
        packageName: string;
    };
}

export interface PackageDetails {
    name: string;
    created_at: string;
    tag_name: string;
    zipball_url: string;
    description: string;
    readme: string;
    home: string;
    provider: string[];
    tags: string[];
    type: string;
    create?: string;
    download?: number;
}

export interface PackageHistoryItem {
    tag_name: string;
    created_at: string;
    zipball_url: string;
}
