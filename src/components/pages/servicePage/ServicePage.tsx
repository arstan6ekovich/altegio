"use client";

import { AddSearch, AddTrue } from "@/redux/slices/ProductSlice";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/store";

import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { MdMenu } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import ModalNewService from "./modalNewService/ModalNewService";
import Navbar from "@/components/Navbar/Navbar";
import s from "./ServicePage.module.scss";
import scss from "./ServicePage.module.scss";
import { useDispatch } from "react-redux";

interface ICategory {
  clinic: number;
  name: string;
}

const basic = process.env.NEXT_PUBLIC_ALTEGIO;

const ServicePage = () => {
  const [showCreateList, setShowCreateList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState<IFormInput[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const openCreateList = () => {
    setShowCreateList((prev) => !prev);
  };

  const getCategory = async () => {
    try {
      const { data } = await axios(
        "http://185.245.182.159/api/service-categories/"
      );
      console.log(data, "data");
      setCategory(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRFTOKEN":
      "Romott4daKFShDb1FnhJSEkwXGPZTbuvDDBZw8DeaAufrI7KDYQLMa4x5BfsB9X1",
  };

  const postClinic = (payload: any) => {
    axios
      .post("http://185.245.182.159/api/service-categories/", payload, {
        headers,
      })
      .then((response) => {
        console.log("Status Code:", response.status);
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
  };

  interface IFormInput {
    _id: number;
    firstName: string;
    lastName: string;
    age: number;
    defaultOption: string;
    secondOption: string;
    locationSettings: string;
    number: number;
  }
  const handleSearchChange = () => {
    // const filteredCategory = category.filter((item)=> item.name === searchTerm)
    // setCategory(filteredCategory)
    alert(
      "Search category and service will be here after integration service with backend"
    );
    // setSearchTerm(e.target.value.toLowerCase());
  };
  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_ALTEGIO}`);
        setProduct(data);
      } catch (e) {
        console.log(e);
      }
    }
    getCategory();
    fetchProduct();
  }, []);

  const filteredProducts = product.filter((el) =>
    el.firstName.toLowerCase().includes(searchTerm)
  );

  const openHandleModal = () => {
    setOpenModal(true);
  };

  dispatch(AddSearch(filteredProducts));

  return (
    <div className={s.servicePage}>
      <Navbar />
      <div className={s.mainServicePage}>
        <div className={s.headServicePage}>
          <div className={s.serviceBurger}>
            <MdMenu />
          </div>
          <div className={s.headServiceTitle}>
            <h1> Категории услуг</h1>
            <h4>Настройки</h4>
          </div>
        </div>
        <div className={s.servicePageCategories}>
          <div className={s.serviceSearch}>
            <div className={s.serviceSearchInput}>
              <input
                type="text"
                placeholder="Название услуги"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IoSearchOutline onClick={handleSearchChange} />
            </div>
            <div className={s.createService}>
              <button onClick={openCreateList}>
                Создавать{" "}
                <IoIosArrowDown
                  style={{
                    transform: showCreateList
                      ? "rotate(180deg)"
                      : "rotate(360deg)",
                  }}
                />
              </button>
              {showCreateList ? (
                <ul className={s.createServiceCard}>
                  <li onClick={openHandleModal}>Создать категорию</li>
                  <li>Создать услугу</li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        {category.map((item, id) => (
          <ServiceCategories item={item} key={id} />
        ))}
      </div>
      {openModal && (
        <ModalNewService setCloseModal={setOpenModal} postClinic={postClinic} />
      )}
      {openModal && <div className={s.bg}></div>}
    </div>
  );
};

export function ServiceCategories({ item }) {
  const [product, setProduct] = useState([]);
  const [mar, setMar] = useState(false);
  const dispatch = useDispatch();
  dispatch(AddTrue(mar));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_ALTEGIO}`);
        setProduct(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const user = JSON.parse(String(localStorage.getItem("user")));
  const [users, setUsers] = useState<string>();
  console.log(users);

  const handleUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      setUsers(data.profile.username);
      // console.log(data.profile);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleUser();
  }, [user]);
  return (
    <div className={s.serviceCategories}>
      <div className={s.serviceCategory}>
        <div className={s.serviceCategoriesOpen} onClick={() => setMar(!mar)}>
          <IoIosArrowDown
            style={{
              transform: mar ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
          <div className={s.serviceCategoriesTitle}>
            <h3>{item.name}</h3>
            <h4>Содержить услуги: {product.length}</h4>
          </div>
        </div>
        <div className={s.serviceCategoriesEdit}>
          <MdOutlineModeEdit />
          <MdMenu />
        </div>
      </div>
      {mar && <ServiceCategoryLists />}
    </div>
  );
}

export function ServiceCategoryLists() {
  interface IFormInput {
    _id: number;
    firstName: string;
    lastName: string;
    age: number;
    defaultOption: string;
    secondOption: string;
    locationSettings: string;
    number: number;
  }

  const [product, setProduct] = useState<IFormInput[]>([]);
  const [isEdit, setIsEdit] = useState<number | null>(null);
  const { register, handleSubmit } = useForm<IFormInput>();
  const { treu, search } = useAppSelector((s) => s.main);

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>(
    {}
  );

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { data: response } = await axios.patch(`${basic}/${isEdit}`, data);
      setProduct(response);
      setIsEdit(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.serviceCategoryLists}>
      <div className={s.serviceCategoryListsHead}>
        <h2>Имя</h2>
        <div className={s.serviceCategoryListsHeadSet}>
          <h2>Онлайн-бронирование</h2>
          <h2>Цена</h2>
          <h2>Продолжительность</h2>
          <h2>Спецификация материалов</h2>
          <h2>Персонал</h2>
        </div>
      </div>
      <div className={s.categotyLists}>
        {search.map((item) => (
          <>
            {isEdit === item._id ? (
              <>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={scss.form_mathers}>
                    <div className={scss.form_inputs}>
                      <h1>Name on bill</h1>
                      <input
                        {...register("firstName", { required: true })}
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div
                className={s.categoryList}
                style={{
                  display: treu ? "flex" : "none",
                }}
              >
                <div className={s.categoryListName}>
                  <MdMenu />
                  <h2>{item.firstName}</h2>
                </div>
                <div className={s.categoryListContent}>
                  <div className={s.categoryBook}>
                    <div
                      className={s.categoryBookCheck}
                      onClick={() => handleCheckboxChange(item._id)}
                    >
                      <div
                        className={`${s.categoryBookCheckBox} ${
                          checkedItems[item._id] ? s.checked : ""
                        }`}
                      ></div>
                    </div>
                    <span>На</span>
                  </div>
                  <h3>{item.number} сом</h3>
                  <h3>1ч 0м</h3>
                  <h4>Не Указано</h4>
                  <span>
                    <FaRegUserCircle />
                  </span>
                  <span onClick={() => setIsEdit(item._id)}>
                    <MdOutlineModeEdit />
                  </span>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      {search.length === 0 ? (
        <h1
          style={{
            textAlign: "center",
            padding: "50px 0",
          }}
        >
          Нет такие данные
        </h1>
      ) : (
        <button
          className={s.addService}
          style={{
            display: treu ? "flex" : "none",
          }}
        >
          <Link href="/service/servicepage/advancedsettings">
            + Добавить услуги
          </Link>
        </button>
      )}
    </div>
  );
}
export default ServicePage;
