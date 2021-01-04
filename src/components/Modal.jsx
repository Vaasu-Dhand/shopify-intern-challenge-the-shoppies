import React, { useState } from 'react';
import {
  Icon,
  List,
  Button,
  Modal as ModalComponent,
  Transition,
  Label,
  Menu,
} from 'semantic-ui-react';

export default function Modal() {
  // State Variables
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  let nominatedTitles = JSON.parse(localStorage.getItem('nominations'));

  const handleClick = (titleID) => {
    console.log(titleID, 'was removed');
    // Delete Title from LocalStorage
    let nominatedTitles = JSON.parse(localStorage.getItem('nominations'));
    delete nominatedTitles[titleID];
    localStorage.setItem('nominations', JSON.stringify(nominatedTitles));
    setVisible(!visible);
  };

  return (
    <>
      <Menu compact onClick={() => setOpen(true)} className="nominees-count">
        <Menu.Item as="a">
          <Icon name="chess queen" /> Nominations
          <Label color="black" floating>
            {Object.keys(nominatedTitles).length}
          </Label>
        </Menu.Item>
      </Menu>

      {/* <Button onClick={() => setOpen(true)}>View Nominations</Button> */}

      <ModalComponent open={open} onClose={() => setOpen(false)}>
        <ModalComponent.Header>Nominations</ModalComponent.Header>
        <ModalComponent.Content>
          <List bulleted>
            <Transition.Group duration={200}>
              {Object.keys(nominatedTitles).map((title) => (
                <List.Item key={nominatedTitles[title].imdbID}>
                  {nominatedTitles[title].Title} ({nominatedTitles[title].Year})
                  <Button
                    animated="vertical"
                    onClick={() => handleClick(nominatedTitles[title].imdbID)}
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
