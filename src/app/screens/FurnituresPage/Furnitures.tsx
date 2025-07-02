import React, { useEffect, useState, ChangeEvent } from "react";
import { Stack, Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Furniture } from "../../../lib/types/furniture";
import { CartItem } from "../../../lib/types/search";
import FurnitureService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

// Room categories
type RoomCategory = "BEDROOM" | "LIVING_ROOM" | "DINING_ROOM" | "OFFICE" | "OUTDOOR";

const categories: { label: string; value: RoomCategory | "ALL"; img: string }[] = [
  { label: "All", value: "ALL", img: "/img/all.png" },
  { label: "Bedroom", value: "BEDROOM", img: "/img/bedroom.png" },
  { label: "Living Room", value: "LIVING_ROOM", img: "/img/livingR.png" },
  { label: "Dining Room", value: "DINING_ROOM", img: "/img/kitchen.png" },
  { label: "Office", value: "OFFICE", img: "/img/office.png" },
  { label: "Outdoor", value: "OUTDOOR", img: "/img/outdoor.png" },
];

// Props
interface FurnituresProps {
  onAdd: (item: CartItem) => void;
}

const Furnitures: React.FC<FurnituresProps> = ({ onAdd }) => {
  const [furnitures, setFurnitures] = useState<Furniture[]>([]);
  const [filter, setFilter] = useState<RoomCategory | "ALL">("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 10;
  const history = useHistory();

  useEffect(() => {
    const fetchFurnitures = async () => {
      try {
        const service = new FurnitureService();
        const result = await service.getFurnitures({ page: 1, limit: 100, order: "price" });
        setFurnitures(result);
      } catch (err) {
        console.error("Error fetching furnitures:", err);
      }
    };
    fetchFurnitures();
  }, []);

  // Filter furniture
  const filteredFurniture =
    filter === "ALL"
      ? furnitures
      : furnitures.filter((item) => item.furnitureCollection === filter);

  // Paginate filtered furniture
  const paginatedFurniture = filteredFurniture.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredFurniture.length / itemsPerPage);

  // Handlers
  const handleCardClick = (id: string) => {
    history.push(`/furnitures/${id}`);
  };

  const handlePagination = (e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleCategoryChange = (value: RoomCategory | "ALL") => {
    setFilter(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="furniture-list-container">
      <h2 className="section-title">Furnitures</h2>

      {/* Category Menu */}
      <div className="category-menu">
        {categories.map((cat) => (
          <div
            key={cat.value}
            className={`category-item ${filter === cat.value ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat.value)}
          >
            <img src={cat.img} alt={cat.label} />
            <span>{cat.label}</span>
          </div>
        ))}
      </div>

      {/* Furniture Grid */}
      <div className="furniture-grid">
        {paginatedFurniture.map((item) => (
          <div key={item._id} className="furniture-card">
            <img
              src={`${serverApi}/${item.furnitureImages[0]}`}
              alt={item.furnitureName}
              onClick={() => handleCardClick(item._id)}
              style={{ cursor: "pointer" }}
            />
            <h3>{item.furnitureName}</h3>
            <p className="price">${item.furniturePrice.toLocaleString()}</p>
            <div className="stars">
              {"★".repeat(item.furnitureRanking)}
              {"☆".repeat(5 - item.furnitureRanking)}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd({
                  _id: item._id,
                  name: item.furnitureName,
                  image: item.furnitureImages[0],
                  quantity: 1,
                  price: item.furniturePrice,
                });
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack className="pagination-section" spacing={2}>
          <Pagination
            page={currentPage}
            count={totalPages}
            onChange={handlePagination}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
                color="secondary"
              />
            )}
          />
        </Stack>
      )}
    </div>
  );
};

export default Furnitures;
