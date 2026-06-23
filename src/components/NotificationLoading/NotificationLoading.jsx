const NotificationLoadingCard = () => {
  const cards = [];
      for (let i = 0; i < 5; i++) {
    cards.push(
      <div
      key={i}
      className="
      flex gap-3
      p-4
      border-b
      animate-pulse
      card
      rounded-none
      "
    >
      {/* Avatar */}

      <div className="relative">

        <div
          className="
          w-14
          h-14
          rounded-full
          bg-gray-200
          "
        />

        {/* Small Icon */}

        <div
          className="
          
          absolute
          -bottom-1
          -right-1
          w-6
          h-6
          rounded-full
          bg-gray-300
          "
        />

      </div>

      {/* Content */}

      <div className="flex-1 ">

        <div
          className="
          h-4
          bg-gray-200
          rounded
          w-3/4
          mb-3
          "
        />

        <div
          className="
          h-3
          bg-gray-200
          rounded
          w-24
          "
        />

      </div>

      {/* Check button */}

      <div
        className="
        w-8
        h-8
        rounded-full
        bg-gray-200
        "
      />

    </div>
    );
  }
  return <>
  
  {cards}
  
  </>
};

export default NotificationLoadingCard;