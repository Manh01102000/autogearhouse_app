// Import css
import HeroSectionStyles from "./HeroSection.module.scss"; // Import CSS Module
// 
const HeroSection = () => {
  return (
    <section className={HeroSectionStyles.hero}>
      <h1 className={HeroSectionStyles.hero__title}>Chào mừng đến với AutoGearHouse!</h1>
      <button className={`${HeroSectionStyles["hero__button"]} ${HeroSectionStyles["hero__button--primary"]}`}>
        Mua ngay
      </button>
    </section >
  );
};

export default HeroSection;
