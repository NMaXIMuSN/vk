import { Button, FormItem, FormLayoutGroup, Group, Input, Panel, PanelHeader } from "@vkontakte/vkui"

interface MainViewProps {
  id: string
}

// https://vk.com/away.php?to=https%3A%2F%2Fcatfact.ninja%2Ffact&utf=1

export const MainView = ({ id }: MainViewProps) => {
  return (
    <>
      <Panel id={id}>
        <PanelHeader>Main</PanelHeader>
        <Group>
          <FormLayoutGroup mode="horizontal" segmented>
            <FormItem htmlFor="name" top="Имя">
              <Input id="name" />
            </FormItem>
            <Button size="l">
              Отправить
            </Button>

          </FormLayoutGroup>
        </Group>
      </Panel>
    </>
  )
}