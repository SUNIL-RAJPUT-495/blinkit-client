import { FiSearch } from "react-icons/fi";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from 'react-router-dom';


export const Search = () => {
  const navigate = useNavigate()
  const redirectTOSearchPage = ()=>{
    navigate("/Search")
  }
  return (
    <>
      <div onClick={redirectTOSearchPage}
        className="d-flex  p-2 align-items-center gap-2"
        style={{
          backgroundColor: "rgba(248, 245, 245, 1)",
          width: "700px",
          height: "45px",
          color: "#6c757d",
          border:"1px solid rgba(230, 229, 229, 1) ",
          borderRadius:"10px",
          cursor:"text"
        }}
      >
        <div>
          <FiSearch
            style={{
              fontSize: "19px",
              color: "black",
              verticalAlign: "middle",
            }}
          />
        </div>
        <div >
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'Search "Milk" ',
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              'Search "Curd" ',
              1000,
              'Search "Paneer" ',
              1000,
              'Search "Egg" ',
              1000,
              'Search "Butter" ',
              1000,
              'Search "Chocklets" ',
              1000,
              'Search "Rice" ',
              1000,
              'Search "Chips" ',
              1000,
              'Search "Bread" ',
              1000,
              'Search "Suger" ',
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "14px", display: "inline-block" }}
            repeat={Infinity}
          />
        </div>
      </div>
    </>
  );
};
