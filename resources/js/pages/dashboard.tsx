import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Product, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({sales}: {sales: Product[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Metrics Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Sales</CardTitle>
                            <CardDescription>Today</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">$1,250</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Orders</CardTitle>
                            <CardDescription>
                                Pending / Completed
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">12 / 85</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Customers</CardTitle>
                            <CardDescription>New / Returning</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">42 / 120</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Products</CardTitle>
                            <CardDescription>
                                Active / Out of Stock
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">350 / 20</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Analytics / Chart Section */}
                <div className="relative flex-1 overflow-hidden rounded-xl grid grid-cols-3 gap-4">
                    {/* Replace this with your actual chart component */}
                    <Card className='col-span-2'>
                        <CardHeader>
                            <CardTitle>Sales Statistics</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className='gap-2'>
                        <CardHeader>
                            <CardTitle>Top Products</CardTitle>
                        </CardHeader>
                        <CardContent >
                            <div  className='space-y-2'>
                            {sales.map((sale) => (
                                <Card className='p-0'>
                                    <CardContent className='grid grid-cols-[auto_1fr_auto] p-2 gap-2 justify-center items-center    '>
                                        {sale.image ? <img src={`/storage/${sale.image}`} alt={sale.name} className="w-15 h-15 rounded-lg" /> : <PlaceholderPattern className="w-15 h-15 bg-zinc-300 rounded-lg" />}
                                        <div className=''>
                                            <h3 className='text-base'>{sale.name}</h3>
                                            <p className='text-zinc-500 text-xs'>{sale.sales} Sold</p>
                                        </div>
                                        <p className='font-medium text-sm'>₱{(sale.sales * sale.price).toFixed(2)}</p>
                                    </CardContent>    
                                </Card>
                            ))}
                           </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
