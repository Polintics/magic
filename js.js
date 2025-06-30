
const price = document.querySelector('.price');
const container = document.querySelector('.price-container');

window.addEventListener('scroll', () => {
  const containerRect = container.getBoundingClientRect();
  const priceHeight = price.offsetHeight;

  const offsetTop = 40; // фиксированное расстояние сверху
  const offsetBottom = 20; // отступ снизу

  if (containerRect.top <= offsetTop && containerRect.bottom - offsetBottom >= priceHeight) {
    // фиксируем, пока внутри контейнера
    price.style.position = 'fixed';
    price.style.top = `${offsetTop}px`;
  } else if (containerRect.top > offsetTop) {
    // возвращаем в начальное положение (до того как дошёл)
    price.style.position = 'absolute';
    price.style.top = '0px';
  } else {
    // если дошёл до нижнего предела контейнера
    price.style.position = 'absolute';
    price.style.top = `${container.offsetHeight - priceHeight}px`;
  }
});

// листаем книгу
document.addEventListener("DOMContentLoaded", () => {
  const bookElement = document.querySelector(".book");
  const arrowPrev = document.querySelector(".arrow_1");
  const arrowNext = document.querySelector(".arrow_2");

  const totalImages = 16;
  let currentIndex = 1;

  const updateBookImage = () => {
    bookElement.style.backgroundImage = `url("img/book${currentIndex}.png")`;
  };

  arrowNext.addEventListener("click", () => {
    currentIndex = currentIndex === totalImages ? 1 : currentIndex + 1;
    updateBookImage();
  });

  arrowPrev.addEventListener("click", () => {
    currentIndex = currentIndex === 1 ? totalImages : currentIndex - 1;
    updateBookImage();
  });
});

// возвращеие со страницы ошибки
document.addEventListener("DOMContentLoaded", () => {
  const goBackBtn = document.getElementById("goBack");
  const backButton = document.getElementById("backButton");

  function goBack() {
    if (document.referrer && document.referrer !== location.href) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  }

  goBackBtn.addEventListener("click", goBack);
  backButton.addEventListener("click", goBack);
});

// смена белой и темной темы
  document.addEventListener("DOMContentLoaded", () => {
    const switchBtn = document.querySelector(".tern_off");
  
    switchBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      switchBtn.classList.toggle("active");
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    const contentMap = {
      1: {
        items: [
          {
            img: "img/event1_1.jpg",
            text: "Приглашаем практиков, художников, исследователей и всех, кто работает с генеративными системами как с формой современной магии.<br><br>"
          },
          {
            img: "img/event1_2.jpg",
            text: "Это пространство — для обмена, экспериментов и созерцания.<br><br>"
          },
          {
            img: "img/event1_3.jpg",
            text: "Третий блок текста для первого события.<br><br>"
          }
        ]
      },
      2: {
        items: [
          {
            img: "img/event2.jpg",
            text: "Routine radio event — вечер живой музыки от Radio Routines с участием молодых и известных коллективов.<br><br>"
          }
        ]
      },
      3: {
        items: [
          {
            img: "img/event3_1.jpg",
            text: "Это звуковое пространство, где музыка не отвлекает, а помогает настроиться: на себя, на дело, на ритм дня.<br><br>"
          },
          {
            img: "img/event3_2.jpg",
            text: "На этой встрече мы приглашаем тебя услышать routine не только ушами, но и телом, вниманием, состоянием.<br><br>"
          },
          {
            img: "img/event3_3.jpg",
            text: "Это будет не концерт и не лекция — скорее, медленная практика совместного присутствия в звуке.<br><br>"
          }
        ]
      }
    };
  
    const content = document.getElementById("eventContent");
    const detailPanel = document.getElementById("eventDetail");
  
    document.querySelectorAll("[data-id]").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.getAttribute("data-id");
        const data = contentMap[id];
  
        if (data) {
          const html = data.items.map(item => `
            <div class="image-text-block">
              <img src="${item.img}" alt="Event ${id}">
              <p>${item.text}</p>
            </div>
          `).join("");
  
          content.innerHTML = html;
  
          if (window.innerWidth <= 768) {
            detailPanel.classList.add("open");
          }
        }
      });
    });
  
    // Кнопка закрытия
    document.getElementById("closePanel").addEventListener("click", () => {
      detailPanel.classList.remove("open");
    });
  
    // Закрытие по клику вне панели (опционально)
    window.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 768 &&
        !detailPanel.contains(e.target) &&
        !e.target.closest("[data-id]")
      ) {
        detailPanel.classList.remove("open");
      }
    });
  });