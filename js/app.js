// time convert

function getTimeString(time) {
  const year = parseInt(time / (365 * 86400)); // 1 year = 365 days
  let remainingSecond = time % (365 * 86400);
  const day = parseInt(remainingSecond / 86400);
  remainingSecond = remainingSecond % 86400;
  const hour = parseInt(remainingSecond / 3600);
  remainingSecond = remainingSecond % 3600;
  const minute = parseInt(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;
  return `${year} y ${day} d ${hour} h ${minute} min ${remainingSecond} s ago`;
}

// remove active class in button
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  // class name html collection dive ja 100% array na tai for of loop
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// Fetch, Load and Show Categories on html

// create loadCategories

const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// create load videos

const loadVideos = (searchText = "") => {
  // fetch the data
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// when click button videos fond by category

const loadCategoryVideos = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // remove active class by call function
      removeActiveClass();

      // active button and add active class
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// click details button

const loadDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  displayDetails(data.video);
};

// display details function

const displayDetails = (video) => {
  // console.log(video);
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
    <img src=${video.thumbnail} />
    <p>${video.description}
    `;

  //way-1
  // document.getElementById('showModalData').click();
  //way-2
  document.getElementById("customModal").showModal();
};

// api object model
// {d
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }

// create display videos

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = ""; // when call this function by loadCategoryVideos() then this container become empty and add video by category
  // console.log(videos);

  //when has no video on category
  if (videos.length == 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
            <img src="assets/Icon.png" alt="">
            <h2 class="text-center text-xl font-bold">
            No Content Here in this Category
            </h2>
        </div>
        `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  //find 12 videos
  videos.forEach((video) => {
    // console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
     <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `<span class="absolute right-2 bottom-2 bg-black text-[10px] text-white rounded p-1">
        ${getTimeString(video.others.posted_date)}
      </span>`
      }

  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div class="w-10 h-10">
        <img class="w-full h-full rounded-full object-cover" src=${
          video.authors[0].profile_picture
        }>
    </div>
    <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-2">
            <p class="text-gray-500">${video.authors[0].profile_name}</p>

            ${
              video.authors[0].verified === true
                ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">`
                : ""
            }
        </div>
        <p><button onclick="loadDetails('${
          video.video_id
        }')" class="btn btn-sm btn-error"> details</button></p>
    </div>
  </div>
    `;
    videoContainer.append(card);
  });
};

// create displayCategories
const displayCategories = (categories) => {
  // where button add
  const categoryContainer = document.getElementById("categories");
  // get category from categories
  // console.log(categories);
  categories.forEach((item) => {
    // console.log(item);
    // create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
        ${item.category}
        </button>
        `;

    // add button to category container
    categoryContainer.append(buttonContainer);
  });
};

//input search
document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});

loadCategories();
loadVideos();

// // again try

// // time convert

// function getTimeString(time) {
//   const year = parseInt(time / (365 * 86400)); // 1 year = 365 days
//   let remainingSecond = time % (365 * 86400);
//   const day = parseInt(remainingSecond / 86400);
//   remainingSecond = remainingSecond % 86400;
//   const hour = parseInt(remainingSecond / 3600);
//   remainingSecond = remainingSecond % 3600;
//   const minute = parseInt(remainingSecond / 60);
//   remainingSecond = remainingSecond % 60;
//   return `${year}y ${day}d ${hour}h ${minute}min ${remainingSecond}s ago`;
// }

// const categoryContainer = document.getElementById("categories");
// const videoContainer = document.getElementById("videos");
// const detailContainer = document.getElementById("modal-content");

// // remove active btn function

// const removeActiveBtn = () => {
//   const buttons = document.getElementsByClassName("category-btn");
//   for (let button of buttons) {
//     button.classList.remove("bg-red-500", "text-white");
//   }
// };

// // for category button

// //fetch data for button

// const loadCategories = () => {
//   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
//     .then((res) => res.json())
//     .then((data) => displayCategories(data.categories))
//     .catch((err) => console.log(err));
// };

// //fetch data for videos

// const loadVideos = (searchText = "") => {
//   fetch(
//     `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
//   )
//     .then((res) => res.json())
//     .then((data) => displayVideos(data.videos))
//     .catch((err) => console.log(err));
// };

// // fetch for category video

// const loadCategoryVideos = (id) => {
//   // alert(id);
//   fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       //remove active btn
//       removeActiveBtn();

//       // active btn
//       const activeBtn = document.getElementById(`btn-${id}`);
//       activeBtn.classList.add("bg-red-500", "text-white");
//       displayVideos(data.category);
//     })
//     .catch((err) => console.log(err));
// };

// // details open with modal when click button

// const loadDetails = async (videoId) => {
//   // console.log(videoId)
//   const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   displayDetails(data.video);
// };

// //details function
// const displayDetails = (video) => {
//   // console.log(video);
//   detailContainer.innerHTML = `
//     <img src=${video.thumbnail}/>
//     <p>${video.description}
//   `;
//   document.getElementById("customModal").showModal();
// };

// // card object means video object

// // const video = {
// //   "category_id": "1001",
// //   "video_id": "aaaa",
// //   "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
// //   "title": "Shape of You",
// //   "authors": [
// //     {
// //       "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
// //       "profile_name": "Olivia Mitchell",
// //       "verified": ""
// //     }
// //   ],
// //   "others": {
// //     "views": "100K",video_id
// //     "posted_date": "16278"
// //   },

// //function for videos
// const displayVideos = (videos) => {
//   videoContainer.innerHTML = ""; // button e click korle sob khali sodi id same golo add

//   // for click button where have no videos

//   if (videos.length == 0) {
//     videoContainer.classList.remove("grid");
//     videoContainer.innerHTML = `
//     <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
//       <img src="assets/icon.png"/>
//       <h2 class="text-center text-3xl font-bold">
//       No Content Here in this Category
//       </h2>
//     </div>
//     `;
//     return;
//   } else {
//     videoContainer.classList.add("grid");
//   }

//   // all videos
//   // console.log(videos);
//   videos.forEach((video) => {
//     // console.log(video);
//     const card = document.createElement("div");
//     card.classList = "card card-compact";
//     card.innerHTML = `
//     <figure class="h-[200px] relative">
//     <img class="w-full h-full object-cover"
//       src=${video.thumbnail}
//       alt="Shoes" />
//       ${
//         video.others.posted_date?.length == 0
//           ? ""
//           : `<span class="absolute text-[10px] right-2 bottom-2 bg-black text-white rounded p-1">
//             ${getTimeString(video.others.posted_date)}
//           </span>`
//       }
//   </figure>
//   <div class="px-0 py-2 flex gap-2">
//         <div>
//             <img class="w-10 h-10 rounded-full object-cover" src=${
//               video.authors[0].profile_picture
//             }/>
//         </div>
//         <div>
//             <h2 class="font-bold">${video.title}</h2>
//             <div class="flex items-center gap-2">
//                 <p class="text-gray-400">${video.authors[0].profile_name}</p>
//                 ${
//                   video.authors[0].verified === true
//                     ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png">`
//                     : ""
//                 }
//             </div>
//             <p><button onclick="loadDetails('${
//               video.video_id
//             }')" class="btn btn-sm btn-error">
//                 Details
//             </button>
//             </p>
//         </div>
//   </div>
//     `;
//     videoContainer.append(card);
//   });
// };

// // function for button

// const displayCategories = (categories) => {
//   //   console.log(categories);
//   categories.forEach((item) => {
//     // console.log(item);
//     const buttonContainer = document.createElement("div");
//     buttonContainer.innerHTML = `
//     <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
//       ${item.category}
//     </button>
//     `;

//     categoryContainer.append(buttonContainer);
//   });
// };

// document.getElementById("search-input").addEventListener("keyup", (e) => {
//   loadVideos(e.target.value);
// });

// loadCategories();
// loadVideos();
