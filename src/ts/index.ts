import './../scss/index.scss';

interface Container {
  scrollTop: number;
  scrollBottom: number;
  bgColor: string;
}

class CurtisCampbell {
  private containers: Container[];
  private faces: NodeListOf<HTMLElement>;

  constructor () {
    this.initialize();
  }

  initialize () {
    console.log('Hello. I see you are checking out my website!');
    console.log(`It's the smart play, I can't lie.`);
    console.log('You see those icons in the background? Great, huh?');
    console.log(`I refuse to take credit for those. Please check out \
                https://www.flaticon.com/authors/freepik for more!`);

    this.containers = [];
    this.setupFaceAnimation();
    this.setupContainers();
    this.attachEventListeners();
  }

  setupFaceAnimation () {
    const faces = Array.prototype.slice.call(document.querySelectorAll('.face img'));
    const timer = 500;
    let currentIndex = 0;

    setInterval(() => {
      faces.forEach((element: HTMLElement) => element.style.display = 'none');
      faces[currentIndex].style.display = 'inline';
      currentIndex = currentIndex < faces.length - 1 ?
        currentIndex + 1 : 0;
    }, timer);
  }

  setupContainers () {
    const containers = Array.prototype.slice.call(document.querySelectorAll('.container'));
    containers.forEach((element: HTMLElement) => {
      this.containers.push({
        bgColor: element.dataset.bg,
        scrollBottom: element.offsetTop + element.clientHeight,
        scrollTop: element.offsetTop,
      });
    });
  }

  attachEventListeners () {
    document.addEventListener('scroll', this.onScroll);
  }

  onScroll = (e: Event) => {
    const windowScroll = window.scrollY;
    const scrollOffset = 200;

    this.containers.forEach((container) => {
      if (
        windowScroll > container.scrollTop - scrollOffset &&
        windowScroll < container.scrollBottom + scrollOffset
      ) {
        document.body.style.backgroundColor = container.bgColor;
      }
    });
  }
}

const app = new CurtisCampbell();
