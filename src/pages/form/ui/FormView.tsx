import { Button, FormItem, FormLayoutGroup, Group, Input, PanelHeader } from "@vkontakte/vkui"
import { ChangeEvent, useRef, useState } from "react"
import { UserInfo } from "src/shared/ui/UserInfo";
import { getControllerSignal, abortController, reInitController } from "src/shared/utils/AbortController/abortController";
import { axiosInstance } from "src/shared/utils/axios/axiosInstance";

interface FormViewProps {
  id: string
}

export interface IUser {
  age: number
  count: number
  name: string
}

const hash = new Map()
export const FormView = ({ id }: FormViewProps) => {
  const [ isLoading, setIsLoading ] = useState(false)
  const setTimeoutRef = useRef<NodeJS.Timeout>()
  const [ user, setUser ] = useState<IUser>()
  const [ name, setName ] = useState('')

  const send = async (name: string) => {
    // получение из хеша
    if (hash.has(name)) {
      setUser(hash.get(name))
      return
    }

    if (isLoading) {
      abortController()
      reInitController()
    }
    
    setIsLoading(true)
    axiosInstance<IUser>({
      method: 'get',
      url: 'https://api.agify.io',

      params: {
        name,
      },
      signal: getControllerSignal(),
    }).then(({data}) => {
      hash.set(name, data)
      setUser(() => data)
      setIsLoading(false)
    })
  }

  const closeSetTimeout = () => {
    clearTimeout(setTimeoutRef.current)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    closeSetTimeout()
    const name = e.target.value.replace(/[^a-z]/gi, '');
    setName(name)

    setTimeoutRef.current = setTimeout(() => {
      send(name)
    }, 3000)
  }

  const onClick = () => {
    closeSetTimeout()
    send(name)
  }
  return (
    <>
      <PanelHeader>Form</PanelHeader>
        <Group>
        <form onSubmit={(e) => e.preventDefault()}>
          <FormLayoutGroup mode="horizontal" segmented>
            <FormItem htmlFor="name" top="Name" >
              <Input value={name} id="name" onChange={onChange}/>
            </FormItem>
            <FormItem style={{flex: '0', minWidth: 'min-content'}}>
              <Button type="submit" className="rounded-l-none" size="l" onClick={onClick}>
                Send
              </Button>
            </FormItem>
          </FormLayoutGroup>
        </form>
          {
            user && 
            <FormItem>
                <UserInfo user={user} />
            </FormItem>
          }
        </Group>
    </>
  )
}