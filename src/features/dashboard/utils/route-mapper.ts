const routeMapper = (pathname: string) => {
    if (pathname.startsWith('/dashboard/account')) return 'account';
    else if (pathname.startsWith('/dashboard/api')) return 'api';
    else if (pathname.startsWith('/dashboard/bulks/')) return 'bulk-details';
    else if (pathname.startsWith('/dashboard/bulks')) return 'bulks-list';
    else if (pathname.startsWith('/dashboard/plans')) return 'plans';
    else if (pathname.startsWith('/dashboard/subscription')) return 'subscription';
    else if (pathname.startsWith('/dashboard/usage')) return 'usage';
    else if (pathname.startsWith('/dashboard')) return 'dashboard';
    else return '';
};

export default routeMapper;
