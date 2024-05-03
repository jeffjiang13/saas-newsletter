import React from 'react';
import DashboardOverViewCard from "@/shared/components/cards/overview.card";
import SubscribersChart from "@/shared/components/charts/subscribers.chart";
import { Container } from '@mui/material';

const GrowthPage = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <h1 className="text-2xl text-surface-900 font-medium" >Growth</h1>
            <p className="opacity-[.7] text-sm pt-2">
                Track your growth
            </p>
            <br />
            <DashboardOverViewCard />
            <SubscribersChart />
        </Container>
    );
};

export default GrowthPage;
