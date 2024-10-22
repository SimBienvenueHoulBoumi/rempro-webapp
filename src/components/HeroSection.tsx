interface HeroSectionProps {
    isLogin: boolean;
    toggleForm: () => void;
  }
  
  const HeroSection: React.FC<HeroSectionProps> = ({ isLogin, toggleForm }) => {
    return (
      <div className="text-center lg:text-left w-full lg:w-2/3">
        <p className="text-3xl font-extrabold text-black mb-4">
          {isLogin ? "Welcome Back!" : "Join Us!"}
        </p>
        <p className="text-lg">Rempro save your animes and video progression</p>
        <p className="text-lg text-black leading-relaxed">
          {isLogin
            ? "Unlock your potential by logging in. Join a community where knowledge meets innovation."
            : "Create an account to unlock all features and join our vibrant community!"}
        </p>
        <button
          onClick={toggleForm}
          className="mt-4 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-all duration-300"
        >
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    );
  };
  
  export default HeroSection;
  