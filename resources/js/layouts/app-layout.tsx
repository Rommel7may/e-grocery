import AppLayoutHeader from '@/layouts/app/app-header-layout';
import AppLayoutSidebar from '@/layouts/app/app-sidebar-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    
    const page = usePage<SharedData>();
    const { auth } = page.props;

    return auth.user.role === 'admin' ? (
        <AppLayoutSidebar breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutSidebar>
    ) : (
        <AppLayoutHeader breadcrumbs={breadcrumbs} {...props}>
            {children}
        </AppLayoutHeader>
    );
}
