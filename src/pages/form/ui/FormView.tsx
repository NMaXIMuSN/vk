import { CellButton, Group, Panel, PanelHeader, View } from "@vkontakte/vkui"
import { Dispatch, SetStateAction, useState } from "react"

interface FormViewProps {
  id: string
}

export const FormView = ({ id }: FormViewProps) => {
  return (
    // <Panel id={id}>
    <>
      <PanelHeader>View 1</PanelHeader>
      <Group>
        <div style={{ height: 200 }} />
        <div>
          asdfasefasfsafasfasfasfasfasasfasasasfasfasasfasfafs
        </div>
        <div style={{ height: 600 }} />
      </Group>
    </>
    // </Panel>
  )
}