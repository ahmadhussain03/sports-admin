/* eslint-disable react/jsx-no-target-blank */
import { useIntl } from 'react-intl'
import { AsideMenuItem } from './AsideMenuItem'
import { useAuth } from '../../../../app/modules/auth'
import { Authorization } from './../../../../lib/authorization';

export function AsideMenuMain() {
  const intl = useIntl()
  const { currentUser } = useAuth()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-bar-chart-line'
        bsTitle={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        className='py-3'
      />
      {/* <AsideMenuItem
        to='/builder'
        title='Layout Builder'
        bsTitle='Layout Builder'
        fontIcon='bi-gear'
        className='py-3'
      /> */}
      {/* <AsideMenuItemWithSubMain
        to='/crafted/pages'
        title='Crafted'
        fontIcon='bi-file-text'
        bsTitle='Crafted'
      >
        <AsideMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/profile/overview'
            title='Overview'
            bsTitle='Overview'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/crafted/pages/profile/projects'
            title='Projects'
            bsTitle='Projects'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/crafted/pages/profile/campaigns'
            title='Campaigns'
            bsTitle='Campaigns'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/crafted/pages/profile/documents'
            title='Documents'
            bsTitle='Documents'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
            bsTitle='Connections'
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
            bsTitle='Horizontal'
          />
          <AsideMenuItem
            to='/crafted/pages/wizards/vertical'
            title='Vertical'
            bsTitle='Vertical'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/accounts' title='Accounts' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/account/overview'
            title='Overview'
            hasBullet={true}
            bsTitle='Overview'
          />
          <AsideMenuItem
            to='/crafted/account/settings'
            title='Settings'
            hasBullet={true}
            bsTitle='Settings'
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/crafted/widgets' title='Widgets' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/widgets/lists'
            title='Lists'
            bsTitle='Lists'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/crafted/widgets/statistics'
            title='Statistics'
            bsTitle='Statistics'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/crafted/widgets/charts'
            title='Charts'
            bsTitle='Charts'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/crafted/widgets/mixed'
            title='Mixed'
            bsTitle='Mixed'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/crafted/widgets/tables'
            title='Tables'
            bsTitle='Tables'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/crafted/widgets/feeds'
            title='Feeds'
            bsTitle='Feeds'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>

        <AsideMenuItemWithSub to='/apps/chat' title='Chat' hasBullet={true}>
          <AsideMenuItem
            to='/apps/chat/private-chat'
            title='Private Chat'
            bsTitle='Private Chat'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/apps/chat/group-chat'
            title='Group Chart'
            bsTitle='Group Chart'
            hasBullet={true}
          />
          <AsideMenuItem
            to='/apps/chat/drawer-chat'
            title='Drawer Chart'
            bsTitle='Drawer Chart'
            hasBullet={true}
          />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSubMain> */}

      {/* <AsideMenuItemWithSubMain to='/error' title='Errors' fontIcon='bi-sticky' bsTitle='Errors'>
        <AsideMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <AsideMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </AsideMenuItemWithSubMain> */}

      <Authorization allowedPermissions={['view-role']}>
        <AsideMenuItem
          to='/role-management/roles'
          title='Role management'
          fontIcon='bi-people'
          bsTitle='Role management'
          icon='/media/icons/duotune/communication/com012.svg'
          className='py-3'
        />
      </Authorization>

      <Authorization allowedPermissions={['view-user']}>
        <AsideMenuItem
          to='/user-management/users'
          title='User management'
          fontIcon='bi-people'
          bsTitle='User management'
          icon='/media/icons/duotune/communication/com006.svg'
          className='py-3'
        />
      </Authorization>

      <Authorization allowedPermissions={['view-team']}>
        <AsideMenuItem
          to='/team-management/teams'
          title='Team Management'
          icon='/media/icons/duotune/communication/com014.svg'
          bsTitle='Team management'
          className='py-3'
        />
      </Authorization>

      <Authorization allowedPermissions={['view-player']}>
        <AsideMenuItem
          to='/player-management/players'
          title='Player Management'
          icon='/media/icons/duotune/communication/com013.svg'
          bsTitle='Player management'
          className='py-3'
        />
      </Authorization>

      <Authorization allowedPermissions={['view-session']}>
        <AsideMenuItem
          to='/session-management/sessions'
          title='Session Management'
          icon='/media/icons/duotune/maps/map001.svg'
          bsTitle='Session management'
          className='py-3'
        />
      </Authorization>

      <Authorization allowedPermissions={['view-finance']}>
        <AsideMenuItem
          to='/finance-management/finances'
          title='Finance Management'
          icon='/media/icons/duotune/graphs/gra004.svg'
          bsTitle='Finance management'
          className='py-3'
        />
      </Authorization>
      {/* <AsideMenuItem
        outside={true}
        to={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        title='User management'
        fontIcon='bi-card-text'
        bsTitle={`Changelog ${process.env.REACT_APP_VERSION}`}
        className='py-3'
      /> */}
    </>
  )
}
