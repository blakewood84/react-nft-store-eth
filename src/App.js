import { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import { useNFTBalances, useMoralis } from "react-moralis";
import { InputGroup, FormControl, Button, CardGroup } from 'react-bootstrap';
import NFTCard from './components/NFTCard';

const Loading = () => {
  return (
    <div className="center">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
  )
}

function App() {

  const [userAddress, setuserAddress] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [ethNFTs, setEthNFTs] = useState({})
  const [polygonNFTs, setPolygonNFTs] = useState({})

  const { Moralis, isInitialized } = useMoralis();

  useEffect(async () => {
    if (typeof window.ethereum !== undefined) {
      
      console.log('MetaMask is installed!')

      window.ethereum.on('accountsChanged', (accounts) => {
        setuserAddress(accounts[0]) // set the user's account they switched to
      })

    } else {
      alert('Please install MetaMask to use Services!')
    }
  }, [])
  
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0]; // user's account
    setuserAddress(account)
  }

  const fetchNFTs = async (address) => {

      setIsLoading(true)
      
      await Moralis.Web3API.account.getNFTs({chain: 'eth', address: address}).then((res) => setEthNFTs(res))
      await Moralis.Web3API.account.getNFTs({chain: 'polygon', address: address}).then((res) => setPolygonNFTs(res))
      
      setIsLoading(false)
  }

  useEffect(async () => {
    if(userAddress !== null) {
      fetchNFTs(userAddress)
    }
  }, [userAddress])

  useEffect(() => {
    if(polygonNFTs?.result?.length > 0) {
      var parse = JSON.parse(polygonNFTs?.result[0]?.metadata)
      console.log(parse)
    }
    
  }, [polygonNFTs])

  return (
    <div className="App">
      <div style={{height: '100%'}}>
        <div className="container d-flex justify-content-center align-items-center flex-column">
          <InputGroup className="mb-3" style={{width: '350px', marginTop: '100px'}}>
            
            <FormControl
              placeholder="ETH Address"
              value={userAddress}
              style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}
              readOnly
            />
            <Button variant="primary" onClick={connectWallet} style={{backgroundColor: '#d63447', borderColor: '#d63447'}}>Connect Wallet</Button>
          </InputGroup>
        </div>
        <div className="container" style={{marginTop: '35px'}}>
          {
            isLoading && (
              <Loading />
            )
          }
        </div>
        {
          !isLoading && ethNFTs?.result?.length === 0 && polygonNFTs?.result?.length == 0 && (
            <div className="container">
              <h1>No NFTs to show! {":-("}</h1>
            </div>
          ) 
        }
        {
            !isLoading && ethNFTs?.result?.length > 0 && (
              <div className="container">
                  <h1 style={{textAlign: 'left', color: '#c886e5'}}>Polygon (MATIC):</h1>
              </div>
            )
          }
          {
            !isLoading && polygonNFTs?.result?.length > 0 && (
              <>
                <div className="container">
                  <h1 style={{textAlign: 'left', color: '#c886e5'}}>Polygon (MATIC):</h1>
                </div>
                <div className="container" style={{display: 'flex', flexFlow: 'wrap'}}>
                  
                    {
                      polygonNFTs?.result.map(item => {
                        return <NFTCard {...item} />
                      })
                    }
                </div>
              </>
            )
          }
      </div>
    </div>
  );
}

export default App;
