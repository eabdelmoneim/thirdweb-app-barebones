import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from "@thirdweb-dev/react";
import { NFTMetadataOwner } from "@thirdweb-dev/sdk";
import { useEffect, useState } from "react";

// Put Your NFT Drop Contract address from the dashboard here
const myNftDropContractAddress = "0xFb838c3416AC09121fFBee17ae9e70e387D6fB72";

function App() {
  const address = useAddress();
  const nftDrop = useNFTDrop(myNftDropContractAddress);
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  const [owned, setOwned] = useState<NFTMetadataOwner[]>();

  async function getOwnedForAddress() {
    if (address) {
      setOwned(await nftDrop?.getOwned(address));
      console.log({ owned });
    }
  }

  return (
    <div>
      {address ? (
        <>
          <button onClick={getOwnedForAddress}>Get Owned</button>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
          <p>Your address: {address}</p>
        </>
      ) : (
        <button onClick={connectWithMetamask}>Connect with Metamask</button>
      )}
    </div>
  );
}

export default App;
