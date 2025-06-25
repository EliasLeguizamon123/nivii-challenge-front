export interface Chart {
    chart_type: string;
    title: string;
    x_axis: string;
    y_axis: string;
    data: ChartData[];
}

export interface ChartData {
    product: string;
    quantity: number;
}