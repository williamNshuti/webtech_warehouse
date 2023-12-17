import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

import MyTheWarehousesDataService from "../../../../api/warehouse/MyTheWarehousesDataService";

import Footer from "../../fragments/footer/Footer";

const MyTheWarehouses = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    warehouses: [],
    searchedWarehouses: [],
    currentPage: 1,
  });

  useEffect(() => {
    MyTheWarehousesDataService().then((response) => {
      setState({
        warehouses: response.data,
        searchedWarehouses: response.data.slice(0, 3),
        currentPage: 1,
      });
    });
  }, []);

  const handleSort = (id) => {
    let path = "/theWarehouse/" + id;
    navigate(path, { state: { id: id } });
  };

  const handleFilter = (event) => {
    const { value } = event.target;
    let warehouses = [...state.warehouses];
    if (value === "") {
      setState({
        ...state,
        searchedWarehouses: warehouses.slice(
          (state.currentPage - 1) * 3,
          state.currentPage * 3
        ),
      });
    } else {
      let searchedWarehouses = warehouses.filter((warehouse) =>
        warehouse.name.toLowerCase().includes(value.toLowerCase())
      );
      setState({
        ...state,
        searchedWarehouses: searchedWarehouses.slice(
          (state.currentPage - 1) * 3,
          state.currentPage * 3
        ),
      });
    }
  };

  const handlePageChange = (pageNumber) => {
    setState({
      ...state,
      searchedWarehouses: state.warehouses.slice(
        (pageNumber - 1) * 3,
        pageNumber * 3
      ),
      currentPage: pageNumber,
    });
  };

  return (
    <PageContainer>
      <WarehouseContainer>
        <Header>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search"
              onChange={handleFilter}
            />
          </SearchContainer>
          <FilterContainer>
            <FilterIcon />
            <FilterSelect
              onChange={(e) => {
                let warehouses = [...state.warehouses];
                if (e.target.value === "price_asc") {
                  warehouses.sort((a, b) => a.price - b.price);
                } else if (e.target.value === "price_desc") {
                  warehouses.sort((a, b) => b.price - a.price);
                }
                setState({
                  ...state,
                  searchedWarehouses: warehouses.slice(
                    (state.currentPage - 1) * 3,
                    state.currentPage * 3
                  ),
                });
              }}>
              <option value="">Filter</option>
              <option value="price_asc">Price Ascending</option>
              <option value="price_desc">Price Descending</option>
            </FilterSelect>
          </FilterContainer>
        </Header>

        <WarehouseGrid>
          {state.searchedWarehouses.map((warehouse) => (
            <WarehouseCard key={warehouse.id}>
              <WarehouseImage
                src={warehouse.profileImgUrl}
                alt={warehouse.name}
              />
              <WarehouseDetails>
                <WarehouseName>{warehouse.name}</WarehouseName>
                <WarehousePrice>
                  {warehouse?.price?.toLocaleString()} Rwf
                </WarehousePrice>
                <DetailsButton onClick={() => handleSort(warehouse.id)}>
                  View Details
                </DetailsButton>
              </WarehouseDetails>
            </WarehouseCard>
          ))}
        </WarehouseGrid>

        {state.searchedWarehouses.length > 0 && (
          <PaginationContainer>
            {[...Array(Math.ceil(state.warehouses.length / 3))].map(
              (page, index) => (
                <PageButton
                  key={index}
                  className={index + 1 === state.currentPage && "active"}
                  onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </PageButton>
              )
            )}
          </PaginationContainer>
        )}
      </WarehouseContainer>
      <Footer />
    </PageContainer>
  );
};

export default MyTheWarehouses;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const WarehouseContainer = styled.section`
  width: 80%;
  max-width: 1200px;
  margin: 20px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(IoMdSearch)`
  font-size: 1.5rem;
  color: #555;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterIcon = styled(FaFilter)`
  font-size: 1.5rem;
  color: #555;
  margin-right: 8px;
`;

const FilterSelect = styled.select`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const WarehouseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const WarehouseCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const WarehouseImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const WarehouseDetails = styled.div`
  padding: 16px;
`;

const WarehouseName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 8px;
`;

const WarehousePrice = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
`;

const DetailsButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #45a048;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  margin: 0 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #45a048;
  }

  &.active {
    background-color: #364237;
  }
`;
