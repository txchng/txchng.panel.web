import Vue from 'vue'
import VueRouter from 'vue-router'

import Splash from '@/components/share/splash/splash.vue'
import CompanyPanel from '@/components/company/panel/companyPanel.vue'
import Login from '@/components/user/login/login.vue'
import AddRemittance from '../components/remittance/add/addRemittance.vue'
import RemittanceDetail from '@/components/remittance/detail/remittanceDetail.vue'
import AddDistribution from '@/components/distribution/add/addDistribution.vue'
import RemittancePanel from '@/components/remittance/panel/remittancePanel.vue'
import AssignCompany from '@/components/remittance/assignCompany/assignCompany.vue'
import DistributionPanel from '@/components/distribution/panel/distributionPanel.vue'
import AddTransaction from '@/components/transaction/add/addTransaction.vue'
import TransactionPanel from '@/components/transaction/panel/transactionPanel.vue'
import CurrencyPanel from '@/components/currency/panel/currencyPanel.vue'
import CoworkerCompanyPanel from '@/components/company/coworkerPanel/coworkerCompanyPanel.vue'
import RequestPanel from '@/components/request/panel/requestPanel.vue'
import WagePanel from '@/components/wage/panel/wagePanel.vue'
import PrintableDistribution from '@/components/distribution/printable/printableDistribution.vue'
import TotalPendingDistribution from '@/components/distribution/totalPendding/totalPendingDistribution.vue'
import TodayTotalPendingDistribution from '@/components/distribution/todayTotalPendding/todayTotalPendingDistribution.vue'
import TodayTotalDeliveredDistribution from '@/components/distribution/todayTotalDelivered/todayTotalDeliveredDistribution.vue';
import UserPositionPanel from '@/components/userPosition/panel/userPositionPanel.vue';
import TotalTransaction from '@/components/transaction/total/totalTransaction.vue';
import CreateTransactionFromRemittance from '@/components/transaction/createFromRemittance/createTransactionFromRemittance.vue';
import CreditPanel from '@/components/credit/panel/creditPanel.vue';
import TotalCredit from '@/components/credit/total/totalCredit.vue';
import AddCredit from '@/components/credit/add/addCredit.vue';


import Full from '@/container/Full';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Full,
        children: [
            {
                path: '/',
                name: 'Splash',
                component: Splash
            },
            {
                path: '/dashboard',
                name: 'CompanyPanel',
                component: CompanyPanel
            },
            {
                path: '/setting/currency',
                name: 'CurrencyPanel',
                component: CurrencyPanel
            },
            {
                path: '/setting/co-comapny',
                name: 'CoworkerCompanyPanel',
                component: CoworkerCompanyPanel
            },
            {
                path: '/setting/wage',
                name: 'WagePanel',
                component: WagePanel
            },
            {
                path: '/remittance/add',
                name: 'AddRemittance',
                component: AddRemittance
            },
            {
                path: '/remittance/list',
                name: 'RemittancePanel',
                component: RemittancePanel
            },
            {
                path: '/remittance/assignCompany/:remittanceId',
                props: true,
                name: 'AssignCompany',
                component: AssignCompany
            },

            {
                path: '/distribution/add',
                name: 'AddDistribution',
                component: AddDistribution
            },
            {
                path: '/distribution/list',
                name: 'DistributionPanel',
                component: DistributionPanel
            },

            {
                path: '/credit/add',
                name: 'AddCredit',
                component: AddCredit
            },
            {
                path: '/credit/list',
                name: 'CreditPanel',
                component: CreditPanel
            },
            {
                path: '/credit/total',
                name: 'TotalCredit',
                component: TotalCredit
            },

            {
                path: '/request/list',
                name: 'RequestPanel',
                component: RequestPanel
            },
            {
                path: '/remittance/detail/:remittanceId',
                name: 'RemittanceDetail',
                props: true,
                component: RemittanceDetail
            },
            {
                path: '/remittance/print/:remittanceId',
                name: 'RemittanceDetail',
                props: true,
                component: RemittanceDetail
            },
            {
                path: '/transaction/add',
                name: 'AddTransaction',
                props: true,
                component: AddTransaction
            },
            {
                path: '/transaction/createFromRemittance/:remittanceId',
                name: 'CreateTransactionFromRemittance',
                props: true,
                component: CreateTransactionFromRemittance
            },
            {
                path: '/transaction/list',
                name: 'TransactionPanel',
                props: true,
                component: TransactionPanel
            },
            {
                path: '/transaction/total',
                name: 'TotalTransaction',
                props: true,
                component: TotalTransaction
            },
            {
                path: '/remittance/totalPending',
                name: 'TotalPendingDistribution',
                component: TotalPendingDistribution
            },
            {
                path: '/remittance/todayTotalPending',
                name: 'TodayTotalPendingDistribution',
                component: TodayTotalPendingDistribution
            },
            {
                path: '/remittance/todayTotalDelivered',
                name: 'TodayTotalDeliveredDistribution',
                component: TodayTotalDeliveredDistribution
            },
            {
                path: '/userPosition/list',
                props: true,
                name: 'UserPositionPanel',
                component: UserPositionPanel
            },


        ]
    },
    {
        path: '/',
        component: {
            render(c) {
                return c('router-view');
            },
        },
        children: [
            {
                path: 'login',
                name: 'Login',
                component: Login,
            },
            {
                path: '/distribution/print/:remittanceId',
                name: 'PrintableDistribution',
                props: true,
                component: PrintableDistribution
            },
        ],
    },
];

const router = new VueRouter({
    routes
});

export default router;
