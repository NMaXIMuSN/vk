import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Group,
  usePlatform,
  useAdaptivityConditionalRender,
  Cell,
  Tabbar,
  TabbarItem,
  VisuallyHidden,
  Epic,
} from '@vkontakte/vkui';
import { ElementProps } from '@vkontakte/vkui/dist/hooks/useAdaptivityConditionalRender/types';
import { useState } from 'react';
import { FormView } from 'src/pages/form';
import { MainView } from 'src/pages/main';

const panels = ['main', 'form']

export const App = () => {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const isVKCOM = platform === 'vkcom';
  
  const [panel, setPanel] = useState(panels[0]);

  return (
    <AppRoot>
      <SplitLayout style={{ justifyContent: 'center' }} header={!isVKCOM && <PanelHeader delimiter="none" />}>
      {viewWidth.tabletPlus && (

        <SplitCol className={(viewWidth.tabletPlus as ElementProps).className} fixed width={280} maxWidth={280}>
          <Panel>
            {!isVKCOM && <PanelHeader />}
            <Group>
              {panels.map((i) => (
                <Cell key={i} hovered={i === panel} onClick={() => setPanel(i)}>
                  {i}
                </Cell>
              ))}
              </Group>
          </Panel>  
        </SplitCol>
      )}

        <SplitCol width="100%" maxWidth='700px' stretchedOnMobile autoSpaced>
          <Epic
            activeStory={panel}
            tabbar={viewWidth.tabletMinus && (
              <Tabbar className={viewWidth.tabletMinus.className}>
                <TabbarItem selected={panel === panels[0]} text={panels[0]} onClick={() => setPanel(panels[0])}>
                  <VisuallyHidden>Новости</VisuallyHidden>
                </TabbarItem>
                <TabbarItem selected={panel === panels[1]} text={panels[1]} onClick={() => setPanel(panels[1])}>
                  <VisuallyHidden>Профиль</VisuallyHidden>
                </TabbarItem>
              </Tabbar>
            )}
          >
            <View id={panels[0]} activePanel={panels[0]}>
              <Panel id={panels[0]}>
                <MainView id={panel[0]} />
              </Panel>
            </View>
            <View id={panels[1]} activePanel={panels[1]}>
              <Panel id={panels[1]}>
                <FormView id={panel[1]} />
              </Panel>
            </View>
          </Epic>
        </SplitCol>
      </SplitLayout>      
    </AppRoot>
  );
};