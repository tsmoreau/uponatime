/* pages/creator-dashboard.js */
import { ethers } from "ethers";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Create from "../ModalCreateBox";
import { nftmarketaddress, nftaddress, IPFSgateway } from "../../config";
import { Popover, Transition, Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import Market from "../../abis/NFTMarket.json";
import NFT from "../../abis/NFT.json";

export default function DashboardItemsCreated() {
  const [nfts, setNfts] = useState([]);
  const [mynfts, setMyNfts] = useState([]);
  const [sold, setSold] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyMintedItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const finalURI = IPFSgateway + tokenUri.substring(7);
        const meta = await axios.get(finalURI);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");

        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          itemId: i.itemId,
          minter: i.minter,
          owner: i.owner,
          sold: i.sold,
          image: IPFSgateway + meta.data.image.substring(7),
          name: meta.data.name,
          description: meta.data.description,
          tag1: meta.data.tags[0],
          tag2: meta.data.tags[1],
          onSale: i.onSale
        };
        return item;
      })
    );

    setNfts(items);

    setLoadingState("loaded");
    console.log("MyMinted");
  }
  async function loadNFTs2() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyOwnedItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const finalURI = IPFSgateway + tokenUri.substring(7);
        const meta = await axios.get(finalURI);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");

        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          itemId: i.itemId,
          minter: i.minter,
          owner: i.owner,
          sold: i.sold,
          image: IPFSgateway + meta.data.image.substring(7),
          name: meta.data.name,
          description: meta.data.description,
          tag1: meta.data.tags[0],
          tag2: meta.data.tags[1],
          onSale: i.onSale
        };
        return item;
      })
    );

    setNfts(items);

    setLoadingState("loaded");
    console.log("InitialLoad-Minted");
  }

  async function loadNFTs3() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyOwnedItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          minter: i.minter,
          owner: i.owner,
          sold: i.sold,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          tag1: meta.data.tags[0],
          tag2: meta.data.tags[1],
          onSale: i.onSale
        };
        return item;
      })
    );

    setNfts(items);

    setLoadingState("loaded");
    console.log("MyOwned");
  }

  if (loadingState === "loaded" && !nfts.length)
    return (
      <h1 className="py-10 px-20 text-3xl text-gray-300">No Items Created</h1>
    );
  return (
    <div>
      <div className="mt-2 flex flex-col justify-between items-center ">
        <div className="flex mx-auto">
          <div className=" p-4 flex mx-auto">
            <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-y-8 gap-x-3 pb-4 mt-0 mb-4">
              {" "}
              {nfts.map((nft, i) => (
                <div
                  key={i}
                  className="shadow-xl  border border-opacity-80 rounded-md transition duration-500 ease-in-out  "
                >
                  <span class="invisible absolute -top-2 right-2 inline-flex z-50 rounded-full h-5 w-5 bg-purple-500"></span>

                  <div className="relative  ">
                    {nft.onSale === true ? (
                      <span class="absolute -top-0.5 -right-4  inline-flex z-0 rounded-full  text-coral-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          fill="currentColor"
                        >
                          <path d="M12.628 21.412l5.969-5.97 1.458 3.71-12.34 4.848-4.808-12.238 9.721 9.65zm-1.276-21.412h-9.352v9.453l10.625 10.547 9.375-9.375-10.648-10.625zm4.025 9.476c-.415-.415-.865-.617-1.378-.617-.578 0-1.227.241-2.171.804-.682.41-1.118.584-1.456.584-.361 0-1.083-.408-.961-1.218.052-.345.25-.697.572-1.02.652-.651 1.544-.848 2.276-.106l.744-.744c-.476-.476-1.096-.792-1.761-.792-.566 0-1.125.227-1.663.677l-.626-.627-.698.699.653.652c-.569.826-.842 2.021.076 2.938 1.011 1.011 2.188.541 3.413-.232.6-.379 1.083-.563 1.475-.563.589 0 1.18.498 1.078 1.258-.052.386-.26.763-.621 1.122-.451.451-.904.679-1.347.679-.418 0-.747-.192-1.049-.462l-.739.739c.463.458 1.082.753 1.735.753.544 0 1.087-.201 1.612-.597l.54.538.697-.697-.52-.521c.743-.896 1.157-2.209.119-3.247zm-9.678-7.476c.938 0 1.699.761 1.699 1.699 0 .938-.761 1.699-1.699 1.699-.938 0-1.699-.761-1.699-1.699 0-.938.761-1.699 1.699-1.699z" />
                        </svg>
                      </span>
                    ) : (
                      <span className=""></span>
                    )}
                  </div>

                  <div className="">
                    <a href={`/item/${encodeURIComponent(nft.tokenId)}`}>
                      <img
                        src={nft.image}
                        className="rounded object-cover h-64 w-64"
                      />
                    </a>
                  </div>
                  <div className="p-2 mt-2">
                    <ul>
                      <li className="w-full flex justify-between">
                        <a href={`/item/${encodeURIComponent(nft.tokenId)}`}>
                          <li className="flex justify-start w-full overflow-hidden">
                            <p className="text-xl text-gray-800 w-52 px-4 mt-1 truncate">
                              {nft.name}
                            </p>
                          </li>
                        </a>
                        <span className="mr-2">
                          <div className="">
                            {nft.onSale === true ? (
                              <span class="">
                                <Popover className="absolute mx-auto">
                                  {({ open }) => (
                                    <div className="flex flex-col text-gray-300">
                                      <Popover.Button className="invisible absolute transform -translate-y-0.5 -translate-x-7 p-3">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                        >
                                          <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
                                        </svg>
                                      </Popover.Button>

                                      <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                      >
                                        <Popover.Panel
                                          static
                                          className="z-9999 w-60 mx-auto"
                                        >
                                          <div className="absolute transform right-48 -translate-x-9 translate-y-2  rounded border -top-32 z-999">
                                            <div className="flex mx-auto w-60 h-auto bg-white">
                                              <ul className="text-gray-700 flex flex-col mx-auto text-sm p-8 py-2">
                                                <li className="flex flex-col mx-auto">
                                                  <Disclosure className="z-9999">
                                                    {({ open }) => (
                                                      <>
                                                        <Disclosure.Button className=" flex justify-between mt-1 z-9999">
                                                          <span className=" flex bg-white  text-gray-500 font-light text-sm px-3 py-1">
                                                            <svg
                                                              width="20"
                                                              height="20"
                                                              viewBox="0 0 24 24"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              fill-rule="evenodd"
                                                              clip-rule="evenodd"
                                                              fill="currentColor"
                                                              className="pr-2"
                                                            >
                                                              <path d="M14.224+2L2.829+13.395L10.609+21.172L22+9.781L22+2C22+2+14.224+2+14.224+2ZM13.395+0L24+0L24+10.609L10.609+24L4.76837e-07+13.396L13.395+0ZM16.586+7.414C17.367+8.196+18.632+8.196+19.415+7.415C20.196+6.632+20.196+5.367+19.415+4.586C18.633+3.804+17.367+3.805+16.586+4.585C15.804+5.368+15.805+6.632+16.586+7.414Z" />
                                                            </svg>
                                                            Change Item Price
                                                          </span>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="rounded z-9999">
                                                          <ul>
                                                            <li className=" flex justify-center ">
                                                              <input
                                                                placeholder="New Price in XTO"
                                                                className="mt-1 border rounded py-2 pl-2 text-gray-500 w-full"
                                                                onChange={(e) =>
                                                                  updateFormInput(
                                                                    {
                                                                      ...formInput,
                                                                      price:
                                                                        e.target
                                                                          .value
                                                                    }
                                                                  )
                                                                }
                                                              />
                                                            </li>
                                                            <li className="hover:bg-gray-500  ml-2 mt-1 mb-3 hover:text-white rounded-full w-36 flex justify-center text-gray-500 ">
                                                              <svg
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                fill="currentColor"
                                                                className="pr-2 transform translate-x-3 translate-y-1"
                                                              >
                                                                <path d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z" />
                                                              </svg>
                                                              <button
                                                                onClick={() =>
                                                                  changeItemPrice(
                                                                    nft.itemId
                                                                  )
                                                                }
                                                                className=" flex   font-light text-sm px-3 py-1"
                                                              >
                                                                Set New Price
                                                              </button>
                                                            </li>
                                                          </ul>
                                                        </Disclosure.Panel>
                                                      </>
                                                    )}
                                                  </Disclosure>
                                                </li>

                                                <li className="flex flex-col mx-auto">
                                                  <button
                                                    onClick={() =>
                                                      cancelMarketItem(
                                                        nft.itemId
                                                      )
                                                    }
                                                    className=" flex bg-white  text-gray-500 font-light text-sm px-3 py-1"
                                                  >
                                                    <svg
                                                      width="20"
                                                      height="20"
                                                      viewBox="0 0 24 24"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill-rule="evenodd"
                                                      clip-rule="evenodd"
                                                      fill="currentColor"
                                                      className="pr-2"
                                                    >
                                                      <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-12v-2h12v2z" />{" "}
                                                    </svg>
                                                    Remove from Sale
                                                  </button>
                                                </li>

                                                <li className="mb-1">
                                                  <Disclosure className="flex justify-center  mb-1">
                                                    {({ open }) => (
                                                      <>
                                                        <Disclosure.Button className="z-9999 flex justify-end mt-0">
                                                          <li className=" ">
                                                            <div className=" flex bg-white ml-5 text-gray-500 font-light text-sm px-3 py-1">
                                                              <svg
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                fill="currentColor"
                                                                className="pr-2"
                                                              >
                                                                <path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z" />
                                                              </svg>
                                                              Send Item
                                                            </div>
                                                          </li>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="rounded z-9999">
                                                          <ul className="flex flex-col justify-center">
                                                            <li className=" flex justify-center ">
                                                              <input
                                                                placeholder="Address to Send Item"
                                                                className="mt-1 border rounded py-2 pl-2 text-gray-500 w-full"
                                                                onChange={(e) =>
                                                                  updateFormInput(
                                                                    {
                                                                      ...formInput,
                                                                      price:
                                                                        e.target
                                                                          .value
                                                                    }
                                                                  )
                                                                }
                                                              />
                                                            </li>
                                                            <li className="hover:bg-gray-500  ml-6 mt-1 mb-3 hover:text-white rounded-full w-28 flex justify-center text-gray-500 ">
                                                              <svg
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                fill="currentColor"
                                                                className="pr-2 transform translate-x-3 translate-y-1"
                                                              >
                                                                <path d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z" />
                                                              </svg>
                                                              <button
                                                                onClick={() =>
                                                                  changeItemPrice(
                                                                    nft.itemId
                                                                  )
                                                                }
                                                                className=" flex   font-light text-sm px-3 py-1"
                                                              >
                                                                Send Item
                                                              </button>
                                                            </li>
                                                          </ul>
                                                        </Disclosure.Panel>
                                                      </>
                                                    )}
                                                  </Disclosure>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </Popover.Panel>
                                      </Transition>
                                    </div>
                                  )}
                                </Popover>
                              </span>
                            ) : (
                              <span className="">
                                <Popover className="absolute mx-auto">
                                  {({ open }) => (
                                    <div className="flex flex-col text-gray-300">
                                      <Popover.Button className="invisible absolute transform -translate-y-0.5 -translate-x-7 p-3">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 24 24"
                                          fill="currentColor"
                                        >
                                          <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z" />
                                        </svg>
                                      </Popover.Button>

                                      <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                      >
                                        <Popover.Panel
                                          static
                                          className="z-999 w-56 mx-auto"
                                        >
                                          <div className="absolute transform translate-y-3 right-48 -translate-x-7 rounded border -top-24 z-999">
                                            <div className="flex mx-auto w-56 h-auto bg-white">
                                              <ul className="text-gray-700 flex flex-col mx-auto text-sm p-8 py-2">
                                                <li className="flex flex-col justify-center">
                                                  <Disclosure className="z-9999">
                                                    {({ open }) => (
                                                      <>
                                                        <Disclosure.Button className=" flex justify-center mt-1 z-9999">
                                                          <span className=" flex bg-white  text-gray-500 font-light text-sm px-3 py-1">
                                                            <svg
                                                              width="20"
                                                              height="20"
                                                              viewBox="0 0 24 24"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              fill-rule="evenodd"
                                                              clip-rule="evenodd"
                                                              fill="currentColor"
                                                              className="pr-2"
                                                            >
                                                              <path d="M14.224+2L2.829+13.395L10.609+21.172L22+9.781L22+2C22+2+14.224+2+14.224+2ZM13.395+0L24+0L24+10.609L10.609+24L4.76837e-07+13.396L13.395+0ZM16.586+7.414C17.367+8.196+18.632+8.196+19.415+7.415C20.196+6.632+20.196+5.367+19.415+4.586C18.633+3.804+17.367+3.805+16.586+4.585C15.804+5.368+15.805+6.632+16.586+7.414Z" />
                                                            </svg>
                                                            Place On Sale
                                                          </span>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="rounded z-9999">
                                                          <ul>
                                                            <li className=" flex justify-center ">
                                                              <input
                                                                placeholder="New Price in XTO"
                                                                className="mt-1 border rounded py-2 pl-2 text-gray-500 w-full"
                                                                onChange={(e) =>
                                                                  updateFormInput(
                                                                    {
                                                                      ...formInput,
                                                                      price:
                                                                        e.target
                                                                          .value
                                                                    }
                                                                  )
                                                                }
                                                              />
                                                            </li>
                                                            <li className="hover:bg-gray-500  ml-2 mt-1 mb-3 hover:text-white rounded-full w-36 flex justify-center text-gray-500 ">
                                                              <svg
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                fill="currentColor"
                                                                className="pr-2 transform translate-x-3 translate-y-1"
                                                              >
                                                                <path d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z" />
                                                              </svg>
                                                              <button
                                                                onClick={() =>
                                                                  placeOnSale(
                                                                    nft.itemId
                                                                  )
                                                                }
                                                                className=" flex   font-light text-sm px-3 py-1"
                                                              >
                                                                Set New Price
                                                              </button>
                                                            </li>
                                                          </ul>
                                                        </Disclosure.Panel>
                                                      </>
                                                    )}
                                                  </Disclosure>
                                                </li>

                                                <li className="flex flex-col justify-center">
                                                  <Disclosure className="z-9999">
                                                    {({ open }) => (
                                                      <>
                                                        <Disclosure.Button className=" flex justify-center z-9999">
                                                          <span className=" flex bg-white  text-gray-500 font-light text-sm px-3 py-1">
                                                            <svg
                                                              width="20"
                                                              height="20"
                                                              viewBox="0 0 24 24"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              fill-rule="evenodd"
                                                              clip-rule="evenodd"
                                                              fill="currentColor"
                                                              className="pr-2"
                                                            >
                                                              <path d="M0 12l11 3.1 7-8.1-8.156 5.672-4.312-1.202 15.362-7.68-3.974 14.57-3.75-3.339-2.17 2.925v-.769l-2-.56v7.383l4.473-6.031 4.527 4.031 6-22z" />
                                                            </svg>
                                                            Send Item
                                                          </span>
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="rounded z-9999">
                                                          <ul>
                                                            <li className=" flex justify-center ">
                                                              <input
                                                                placeholder="Address to Send Item"
                                                                className="mt-1 border rounded py-2 pl-2 text-gray-500 w-full"
                                                                onChange={(e) =>
                                                                  updateFormInput(
                                                                    {
                                                                      ...formInput,
                                                                      price:
                                                                        e.target
                                                                          .value
                                                                    }
                                                                  )
                                                                }
                                                              />
                                                            </li>
                                                            <li className="hover:bg-gray-500  ml-2 mt-1 mb-3 hover:text-white rounded-full w-36 flex justify-center text-gray-500 ">
                                                              <svg
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                fill="currentColor"
                                                                className="pr-2 transform translate-x-3 translate-y-1"
                                                              >
                                                                <path d="M11 17l-5-5.299 1.399-1.43 3.574 3.736 6.572-7.007 1.455 1.403-8 8.597zm11-15v20h-20v-20h20zm2-2h-24v24h24v-24z" />
                                                              </svg>
                                                              <button
                                                                onClick={() =>
                                                                  placeOnSale(
                                                                    nft.itemId
                                                                  )
                                                                }
                                                                className=" flex   font-light text-sm px-3 py-1"
                                                              >
                                                                Send Item
                                                              </button>
                                                            </li>
                                                          </ul>
                                                        </Disclosure.Panel>
                                                      </>
                                                    )}
                                                  </Disclosure>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </Popover.Panel>
                                      </Transition>
                                    </div>
                                  )}
                                </Popover>
                              </span>
                            )}
                          </div>{" "}
                        </span>
                      </li>

                      <li className="mt-1 w-full flex justify-between">
                        <a href={`/user/${encodeURIComponent(nft.minter)}`}>
                          <p className="w-28 mb-2 ml-4 pt-2 text-sm bottom-1 text-gray-300 truncate ">
                            owner {nft.owner}
                          </p>
                        </a>

                        <div className="">
                          {nft.onSale === true ? (
                            <span>
                              <p className=" text-lg mr-3 mb-2 font-normal text-gray-300">
                                {nft.price} XTO
                              </p>
                            </span>
                          ) : (
                            <span className=""></span>
                          )}
                        </div>
                      </li>

                      <li className="flex justify-center mb-2 mt-1 z-50">
                        <div className="">
                          {!!nft.tag1 ? (
                            <span className="">
                              <button
                                id="tagButton2"
                                class="bg-white border border-opacity-80 hover:bg-gray-500 hover:text-white rounded-full text-gray-300 font-light text-xs px-3 py-1 mr-0.5"
                                onClick={() => returnTags(nft.tag1)}
                              >
                                {nft.tag1}
                              </button>
                            </span>
                          ) : (
                            <span className=""></span>
                          )}
                        </div>

                        <div className="">
                          {!!nft.tag2 ? (
                            <span className="">
                              <button
                                id="tagButton2"
                                class="bg-white border border-opacity-80 hover:bg-gray-500 hover:text-white rounded-full text-gray-300 font-light text-xs px-3 py-1 mr-0.5"
                                onClick={() => returnTags(nft.tag2)}
                              >
                                {nft.tag2}
                              </button>
                            </span>
                          ) : (
                            <span className=""></span>
                          )}
                        </div>
                      </li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
