import React, { useState } from "react";

import { TiDeleteOutline } from "react-icons/ti";
import s from "./ModalNewService.module.scss";

const ModalNewService = ({setCloseModal}:{setCloseModal: () => boolean}) => {

  const [showBooking, setShowBooking] = useState(false)
  return (
    <form className={s.modalNewService}>
      <h1>New Service Category</h1>
      <span onClick={() => setCloseModal(false)}>
        <TiDeleteOutline />
      </span>
      <label htmlFor="">
        Name
        <input type="text" placeholder="For example, haircuts" />
      </label>
      <label htmlFor="" className={s.modalNewServiceCheck}>
        <input type="checkbox" name="" id="" onChange={() => setShowBooking(!showBooking)}/>
        Use another name for online booking
      </label>
    {showBooking &&   <label htmlFor="">
        Name for online booking
        <input type="text" placeholder="For example, haircuts" />
      </label>}
      <div className={s.modalNewServiceBtns}>
        <button  onClick={() => setCloseModal(false)}>Cansel</button>
        <button>Create</button>
      </div>
    </form>
  );
};

export default ModalNewService;
