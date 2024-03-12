import { Button, FormItem, FormLayoutGroup, Group, Input, Panel, PanelHeader } from "@vkontakte/vkui"
import { useRef, useState } from "react"
import { axiosInstance } from "src/shared/utils/axios/axiosInstance"

interface MainViewProps {
  id: string
}

// https://vk.com/away.php?to=https%3A%2F%2Fcatfact.ninja%2Ffact&utf=1

interface IFact {
  fact: string
  length: number
}

export const MainView = ({ id }: MainViewProps) => {
  const [inputText, setInputText] = useState('')
  const InputRef = useRef<HTMLInputElement | null>(null)

  const onClick = async () => {
    const { data } = await axiosInstance<IFact>({
      method: 'GET',
      url: 'https://catfact.ninja/fact'
    })

    setInputText(data.fact)
    InputRef.current?.focus()

  }
  
  const onFocus = () => {
    setTimeout(() => {

      if (InputRef.current) {
        console.log('onFocus')
        const data = InputRef.current.value
        InputRef.current.selectionStart = data.split(' ')[0].length
        InputRef.current.selectionEnd = data.split(' ')[0].length
      }
    })
  }

  return (
    <>
      <Panel id={id}>
        <PanelHeader>Main</PanelHeader>
        <Group>
          <FormLayoutGroup mode="horizontal" segmented>
            <FormItem htmlFor="name" top="Fact" >
              <Input value={inputText} id="name" getRef={InputRef} onFocus={onFocus} onChange={(e) => setInputText(e.target.value)}/>
            </FormItem>
            <FormItem style={{flex: '0', minWidth: 'min-content'}}>
              <Button className="rounded-l-none flex-[0] max-w-none min-w-min" size="l" onClick={onClick}>
                Send
              </Button>
            </FormItem>
          </FormLayoutGroup>
        </Group>
      </Panel>
    </>
  )
}