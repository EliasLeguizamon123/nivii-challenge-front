export interface Chart {
    id: number;
    history_id: number;
    chart_type: string;
    title: string;
    x_axis: string;
    y_axis: string;
    data: ChartData[];
}

export interface ChartData {
    label: string;
    value: number;
}