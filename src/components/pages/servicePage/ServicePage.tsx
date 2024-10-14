"use client";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import s from "./ServicePage.module.scss";
import { MdMenu } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./ServicePage.module.scss";
import { useDispatch } from "react-redux";
import { AddSearch, AddTrue } from "@/redux/slices/ProductSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
const basic = process.env.NEXT_PUBLIC_ALTEGIO;

const ServicePage = () => {
  const [showCreateList, setShowCreateList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState<IFormInput[]>([]);
  const dispatch = useDispatch();
  const openCreateList = () => {
    setShowCreateList((prev) => !prev);
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
  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_ALTEGIO}`);
        setProduct(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchProduct();
  }, []);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = product.filter((el) =>
    el.firstName.toLowerCase().includes(searchTerm)
  );

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
                onChange={handleSearchChange}
              />
              <IoSearchOutline />
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
                  <li>Создать категорию</li>
                  <li>Создать услугу</li>
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <ServiceCategories />
      </div>
    </div>
  );
};

export function ServiceCategories() {
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
            <h3>{users}</h3>
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
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(basic!);
        setProduct(response.data);
        dispatch(response.data);
        console.log("Fetched data: ", response.data);
      } catch (e) {
        const error = e as AxiosError;
        console.log(error.response?.data);
      }
    };
    fetchData();
  }, []);

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

                    <div className={scss.form_inputs}>
                      <h1>Taxation system</h1>
                      <select
                        {...register("defaultOption", { required: true })}
                        defaultValue="By default"
                      >
                        <option value="By default">By default</option>
                      </select>
                    </div>

                    <div className={scss.form_inputs}>
                      <h1>VAT</h1>
                      <select
                        {...register("secondOption", { required: true })}
                        defaultValue="By default"
                      >
                        <option value="By default">By default</option>
                      </select>
                    </div>
                    <div className={scss.form_inputs}>
                      <h1>Return visit notification</h1>
                      <select
                        {...register("locationSettings", { required: true })}
                        defaultValue="Use general location settings"
                      >
                        <option value="Use general location settings">
                          Use general location settings
                        </option>
                        <option value="Do not send after the visit">
                          Do not send after the visit
                        </option>
                        <option value="1 day after the visit">
                          1 day after the visit
                        </option>
                        <option value="2 day after the visit">
                          2 days after the visit
                        </option>
                        <option value="3 day after the visit">
                          3 days after the visit
                        </option>
                      </select>
                    </div>
                    <input type="hidden" {...register("number")} />
                    <div className={scss.form_buttons}>
                      <button type="button"> add </button>
                      <h1>Automatic debiting from memberships</h1>

                      <button type="submit">create</button>
                      <button onClick={() => setIsEdit(null)}>Cancel</button>
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
                    <div className={s.categoryBookCheck}>
                      <div className={s.categoryBookCheckBox}></div>
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
          Нет такое данные
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
