import { Toaster } from '@/components/ui/sonner';
import AppLayoutHeader from '@/layouts/app/app-header-layout';
import AppLayoutSidebar from '@/layouts/app/app-sidebar-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const flash = (usePage().props as any).flash ?? {};

    useEffect(() => {
        if (flash?.success) toast.success(flash.success, { id: 'flash-success' });
        if (flash?.error) toast.error(flash.error, { id: 'flash-error' });
        if (flash?.info) toast.info(flash.info, { id: 'flash-info' });
    }, [flash]);


    return auth.user.role === 'admin' ? (
        <AppLayoutSidebar breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster/>
        </AppLayoutSidebar>
    ) : (
        <AppLayoutHeader breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster/>
        </AppLayoutHeader>
    );
}
