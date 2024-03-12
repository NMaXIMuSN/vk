import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  usePlatform,
  Root,
  useAdaptivityConditionalRender,
  Cell,
  Avatar,
  Placeholder,
  Button,
  Separator,
} from '@vkontakte/vkui';
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
      <SplitLayout header={!isVKCOM && <PanelHeader delimiter="none" />}>
        <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
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
        <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
          <View id='view' activePanel={panel}>
            <Panel id={panels[0]}>
              <MainView id={panel[0]} />
            </Panel>
            <Panel id={panels[1]}>
              <FormView id={panel[1]} />
            </Panel>
          </View>
        </SplitCol>

      </SplitLayout>
    </AppRoot>
  );
};