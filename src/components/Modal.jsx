import React, { useState, useContext } from 'react';
import {
  Icon,
  List,
  Button,
  Modal as ModalComponent,
  Transition,
  Label,
  Menu,
} from 'semantic-ui-react';

import { NomineeContext } from '../NomineeContext';

export default function Modal() {
  const { nominees, removeNominee } = useContext(NomineeContext);

  // State Variables
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleClick = (titleID) => {
    removeNominee(titleID);
    setVisible(!visible);
  };

  return (
    <>
      <Menu compact onClick={() => setOpen(true)} className="nominees-count" size="large">
        <Menu.Item as="a">
          <Icon name="chess queen" /> Nominations
          <Label color="black" floating>
            {Object.keys(nominees).length}
          </Label>
        </Menu.Item>
      </Menu>

      <ModalComponent open={open} onClose={() => setOpen(false)}>
        <ModalComponent.Header>Nominations</ModalComponent.Header>
        <ModalComponent.Content>
          {Object.keys(nominees).length !== 0 ? ( // Check if there are any Nominees
            <List bulleted>
              <Transition.Group duration={200}>
                {Object.keys(nominees).map((title) => (
                  <List.Item key={nominees[title].imdbID}>
                    {nominees[title].Title} ({nominees[title].Year})
                    <Button
                      animated="vertical"
                      onClick={() => handleClick(nominees[title].imdbID)}
                    >
                      <Button.Content hidden>Delete</Button.Content>
                      <Button.Content visible>
                        <Icon name="trash" color="red" />
                      </Button.Content>
                    </Button>
                  </List.Item>
                ))}
              </Transition.Group>
            </List>
          ) : (
            <div style={{textAlign: 'center'}}>No Nominees</div>
          )}
        </ModalComponent.Content>
        <ModalComponent.Actions>
          <Button negative onClick={() => setOpen(false)}>
            Close
          </Button>
        </ModalComponent.Actions>
      </ModalComponent>
    </>
  );
}
