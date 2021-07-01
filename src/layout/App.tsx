import { Container, Flex, Button, Spinner, Image } from 'theme-ui'
import { useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { Gallery } from '../components'
import { ActionType, useStateContext } from '../state'
import { ConnectorNames, connectorsByName } from '../connectors'

const iconsMap = {
  [ConnectorNames.Metamask]: 'https://docs.metamask.io/metamask-fox.svg',
  [ConnectorNames.WalletConnect]: 'https://walletconnect.org/walletconnect-logo.svg',
}

const App = () => {
  const {
    dispatch,
    state: { user, activatingConnector },
  } = useStateContext()
  const { connector, activate } = useWeb3React()

  return (
    <Container>
      {!user ? (
        <>
          <Flex sx={{ justifyContent: 'center' }}>
            {Object.keys(connectorsByName).map((name: string) => {
              const currentConnector = connectorsByName[name as keyof typeof connectorsByName]
              const activating = currentConnector === activatingConnector
              const connected = currentConnector === connector

              return (
                <Button
                  mt={2}
                  mr={2}
                  variant="connect"
                  sx={{
                    borderColor: activating ? 'orange' : connected ? 'green' : 'unset',
                    position: 'relative',
                    maxWidth: 250,
                  }}
                  key={name}
                  onClick={() => {
                    dispatch({ type: ActionType.SET_CONNECTOR, payload: currentConnector })
                    activate(
                      connectorsByName[name as keyof typeof connectorsByName] as AbstractConnector
                    )
                  }}
                >
                  {iconsMap[name as keyof typeof connectorsByName] && (
                    <Image
                      sx={{ width: 35, height: 35 }}
                      mr={3}
                      src={iconsMap[name as keyof typeof connectorsByName]}
                    />
                  )}

                  {name}
                  {activating && <Spinner size={20} color="white" sx={{ ml: 3 }} />}
                </Button>
              )
            })}
          </Flex>
        </>
      ) : (
        <Gallery />
      )}
    </Container>
  )
}

export default App
