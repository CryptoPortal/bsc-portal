import { MenuEntry } from '@pancakeswap-libs/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: 'https://bscportal.io/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Exchange',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/pool',
      },
    ],
  },
  {
    label: 'Faas',
    icon: 'FaasIcon',
    initialOpenState: true,
    items: [
      {
        label: 'Farms',
        href: '/farms',
      },
      {
        label: 'Create farm',
        href: '/faas',
      },
    ],
  },
]

export default config
