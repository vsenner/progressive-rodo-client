import React, {FC, useContext, useRef, useState} from 'react';
import UserController, {User} from "../../controller/user.controller";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import CardList from "../CardList/CardList";
import './Navbar.scss'
import CardController from "../../controller/card.controller";
import {Hidden} from "../App";


const Navbar: FC = () => {
  const user_id = useSelector((state: RootState) => state.user.id)


  const {hiddenNavbar, setHiddenNavbar} = useContext(Hidden)

  const add = () => {
    CardController.add(user_id, 'Untiled')
  }

  const scrollBlock: any = useRef<HTMLHeadingElement>(null)

  const [loading, setLoading] = useState<boolean>(true)

  const [scroll, setScroll] = useState<boolean>(false)

  const user: User = useSelector((state: RootState) => state.user)

  return loading ?
    <div className={`navbar ${window.outerWidth < 950 ? hiddenNavbar  ? 'navbar_hidden' : 'navbar_active': ''}`}>
      <div className="navbar__container">
        {window.outerWidth < 950 ?
          <div className="navbar__burger">
            <svg onClick={() => setHiddenNavbar(!hiddenNavbar)} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                 width="24px" height="24px">
              <path
                d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"/>
            </svg>
          </div>
          : null
        }
        <div className={scroll ? 'navbar__user navbar__user_active' : 'navbar__user'}>
          <div className="navbar__user__logo">
            {user.name[0].toUpperCase()}
          </div>
          <span>Hello {user.name} !</span>
          <svg className="navbar__logout" onClick={() => {
            setLoading(false)
            UserController.logout()
            window.location.href = '/login'
          }} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="25px" height="25px" viewBox="0 0 612 612" xmlSpace="preserve">
              <g>
                <polygon points="222.545,319.909 577.228,319.909 500.728,445.091 528.546,445.091 612,306 528.546,166.909 500.728,166.909 577.228,292.146 222.545,292.146"/>
                <polygon points="0,612 417.272,612 417.272,431.182 389.454,431.182 389.454,584.182 27.818,584.182 27.818,27.818 389.454,27.818 389.454,180.818 417.272,180.818 417.272,0 0,0 		"/>
              </g>
          </svg>
        </div>
        <div ref={scrollBlock} className="navbar__data" onScroll={() =>  {
          if(scrollBlock.current.scrollTop > 0) {
            setScroll(true)
          }
          else{
            setScroll(false)
          }
        }}>
          <div className={'navbar__features'}>
          <span className={'navbar__features__title'}>
            <span className={'navbar__features__title__container'}>
              <svg className={'navbar__features__sun'} fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px">
                <path d="M 24.90625 3.96875 C 24.863281 3.976563 24.820313 3.988281 24.78125 4 C 24.316406 4.105469 23.988281 4.523438 24 5 L 24 11 C 23.996094 11.359375 24.183594 11.695313 24.496094 11.878906 C 24.808594 12.058594 25.191406 12.058594 25.503906 11.878906 C 25.816406 11.695313 26.003906 11.359375 26 11 L 26 5 C 26.011719 4.710938 25.894531 4.433594 25.6875 4.238281 C 25.476563 4.039063 25.191406 3.941406 24.90625 3.96875 Z M 10.65625 9.84375 C 10.28125 9.910156 9.980469 10.183594 9.875 10.546875 C 9.769531 10.914063 9.878906 11.304688 10.15625 11.5625 L 14.40625 15.8125 C 14.648438 16.109375 15.035156 16.246094 15.410156 16.160156 C 15.78125 16.074219 16.074219 15.78125 16.160156 15.410156 C 16.246094 15.035156 16.109375 14.648438 15.8125 14.40625 L 11.5625 10.15625 C 11.355469 9.933594 11.054688 9.820313 10.75 9.84375 C 10.71875 9.84375 10.6875 9.84375 10.65625 9.84375 Z M 39.03125 9.84375 C 38.804688 9.875 38.59375 9.988281 38.4375 10.15625 L 34.1875 14.40625 C 33.890625 14.648438 33.753906 15.035156 33.839844 15.410156 C 33.925781 15.78125 34.21875 16.074219 34.589844 16.160156 C 34.964844 16.246094 35.351563 16.109375 35.59375 15.8125 L 39.84375 11.5625 C 40.15625 11.265625 40.246094 10.800781 40.0625 10.410156 C 39.875 10.015625 39.460938 9.789063 39.03125 9.84375 Z M 24.90625 15 C 24.875 15.007813 24.84375 15.019531 24.8125 15.03125 C 24.75 15.035156 24.6875 15.046875 24.625 15.0625 C 24.613281 15.074219 24.605469 15.082031 24.59375 15.09375 C 19.289063 15.320313 15 19.640625 15 25 C 15 30.503906 19.496094 35 25 35 C 30.503906 35 35 30.503906 35 25 C 35 19.660156 30.746094 15.355469 25.46875 15.09375 C 25.433594 15.09375 25.410156 15.0625 25.375 15.0625 C 25.273438 15.023438 25.167969 15.003906 25.0625 15 C 25.042969 15 25.019531 15 25 15 C 24.96875 15 24.9375 15 24.90625 15 Z M 24.9375 17 C 24.957031 17 24.980469 17 25 17 C 25.03125 17 25.0625 17 25.09375 17 C 29.46875 17.050781 33 20.613281 33 25 C 33 29.421875 29.421875 33 25 33 C 20.582031 33 17 29.421875 17 25 C 17 20.601563 20.546875 17.035156 24.9375 17 Z M 4.71875 24 C 4.167969 24.078125 3.78125 24.589844 3.859375 25.140625 C 3.9375 25.691406 4.449219 26.078125 5 26 L 11 26 C 11.359375 26.003906 11.695313 25.816406 11.878906 25.503906 C 12.058594 25.191406 12.058594 24.808594 11.878906 24.496094 C 11.695313 24.183594 11.359375 23.996094 11 24 L 5 24 C 4.96875 24 4.9375 24 4.90625 24 C 4.875 24 4.84375 24 4.8125 24 C 4.78125 24 4.75 24 4.71875 24 Z M 38.71875 24 C 38.167969 24.078125 37.78125 24.589844 37.859375 25.140625 C 37.9375 25.691406 38.449219 26.078125 39 26 L 45 26 C 45.359375 26.003906 45.695313 25.816406 45.878906 25.503906 C 46.058594 25.191406 46.058594 24.808594 45.878906 24.496094 C 45.695313 24.183594 45.359375 23.996094 45 24 L 39 24 C 38.96875 24 38.9375 24 38.90625 24 C 38.875 24 38.84375 24 38.8125 24 C 38.78125 24 38.75 24 38.71875 24 Z M 15 33.875 C 14.773438 33.90625 14.5625 34.019531 14.40625 34.1875 L 10.15625 38.4375 C 9.859375 38.679688 9.722656 39.066406 9.808594 39.441406 C 9.894531 39.8125 10.1875 40.105469 10.558594 40.191406 C 10.933594 40.277344 11.320313 40.140625 11.5625 39.84375 L 15.8125 35.59375 C 16.109375 35.308594 16.199219 34.867188 16.039063 34.488281 C 15.882813 34.109375 15.503906 33.867188 15.09375 33.875 C 15.0625 33.875 15.03125 33.875 15 33.875 Z M 34.6875 33.875 C 34.3125 33.941406 34.011719 34.214844 33.90625 34.578125 C 33.800781 34.945313 33.910156 35.335938 34.1875 35.59375 L 38.4375 39.84375 C 38.679688 40.140625 39.066406 40.277344 39.441406 40.191406 C 39.8125 40.105469 40.105469 39.8125 40.191406 39.441406 C 40.277344 39.066406 40.140625 38.679688 39.84375 38.4375 L 35.59375 34.1875 C 35.40625 33.988281 35.148438 33.878906 34.875 33.875 C 34.84375 33.875 34.8125 33.875 34.78125 33.875 C 34.75 33.875 34.71875 33.875 34.6875 33.875 Z M 24.90625 37.96875 C 24.863281 37.976563 24.820313 37.988281 24.78125 38 C 24.316406 38.105469 23.988281 38.523438 24 39 L 24 45 C 23.996094 45.359375 24.183594 45.695313 24.496094 45.878906 C 24.808594 46.058594 25.191406 46.058594 25.503906 45.878906 C 25.816406 45.695313 26.003906 45.359375 26 45 L 26 39 C 26.011719 38.710938 25.894531 38.433594 25.6875 38.238281 C 25.476563 38.039063 25.191406 37.941406 24.90625 37.96875 Z"/>
              </svg>
            <p>My Day</p>
            </span>
          </span>
            <span className={'navbar__features__title'}>
            <span className={'navbar__features__title__container'}>
              <svg className={'navbar__features__calendar'} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 485.213 485.212" xmlSpace="preserve">
                <g>
	<path d="M60.652,75.816V15.163C60.652,6.781,67.433,0,75.817,0c8.38,0,15.161,6.781,15.161,15.163v60.653
		c0,8.38-6.781,15.161-15.161,15.161C67.433,90.978,60.652,84.196,60.652,75.816z M318.424,90.978
		c8.378,0,15.163-6.781,15.163-15.161V15.163C333.587,6.781,326.802,0,318.424,0c-8.382,0-15.168,6.781-15.168,15.163v60.653
		C303.256,84.196,310.042,90.978,318.424,90.978z M485.212,363.906c0,66.996-54.312,121.307-121.303,121.307
		c-66.986,0-121.302-54.311-121.302-121.307c0-66.986,54.315-121.3,121.302-121.3C430.9,242.606,485.212,296.919,485.212,363.906z
		 M454.89,363.906c0-50.161-40.81-90.976-90.98-90.976c-50.166,0-90.976,40.814-90.976,90.976c0,50.171,40.81,90.98,90.976,90.98
		C414.08,454.886,454.89,414.077,454.89,363.906z M121.305,181.955H60.652v60.651h60.653V181.955z M60.652,333.584h60.653V272.93
		H60.652V333.584z M151.629,242.606h60.654v-60.651h-60.654V242.606z M151.629,333.584h60.654V272.93h-60.654V333.584z
		 M30.328,360.891V151.628h333.582v60.653h30.327V94c0-18.421-14.692-33.349-32.843-33.349h-12.647v15.166
		c0,16.701-13.596,30.325-30.322,30.325c-16.731,0-30.326-13.624-30.326-30.325V60.651H106.14v15.166
		c0,16.701-13.593,30.325-30.322,30.325c-16.733,0-30.327-13.624-30.327-30.325V60.651H32.859C14.707,60.651,0.001,75.579,0.001,94
		v266.892c0,18.36,14.706,33.346,32.858,33.346h179.424v-30.331H32.859C31.485,363.906,30.328,362.487,30.328,360.891z
		 M303.256,242.606v-60.651h-60.648v60.651H303.256z M409.399,363.906h-45.49v-45.49c0-8.377-6.781-15.158-15.163-15.158
		s-15.159,6.781-15.159,15.158v60.658c0,8.378,6.777,15.163,15.159,15.163h60.653c8.382,0,15.163-6.785,15.163-15.163
		C424.562,370.692,417.781,363.906,409.399,363.906z"
  />
</g>
              </svg>
            <p>Planned</p>
            </span>
          </span>
            <span className={'navbar__features__title'}>
            <span className={'navbar__features__title__container'}>
              <svg fill={'rgba(185, 125, 55, 0.73)'}   xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 611.996 611.996" xmlSpace="preserve">
                <g>
	<path d="M610.036,233.895c-4.704-14.45-17.468-25.211-32.524-27.424l-162.664-23.626L342.109,35.469
		c-6.715-13.653-20.882-22.479-36.099-22.479c-15.233,0-29.422,8.822-36.149,22.471L197.14,182.845l-162.698,23.63
		c-15.032,2.205-27.791,12.966-32.508,27.428c-4.691,14.471-0.683,30.674,10.205,41.275l117.697,114.75l-27.757,161.986
		c-2.601,14.989,3.68,30.459,15.997,39.403c6.913,5.028,15.107,7.688,23.702,7.688c6.513,0,12.996-1.598,18.741-4.615
		l145.492-76.489l145.484,76.489c5.741,3.018,12.216,4.615,18.724,4.615c8.587,0,16.776-2.659,23.689-7.688
		c12.317-8.957,18.602-24.423,16.018-39.387l-27.786-162.003l117.718-114.746C610.77,264.548,614.766,248.336,610.036,233.895z
		 M588.083,263.106l-120.892,117.84c-1.985,1.939-2.896,4.729-2.424,7.465l28.541,166.383c1.501,8.691-2.153,17.679-9.315,22.893
		c-4.013,2.917-8.775,4.464-13.775,4.464c-3.785,0-7.545-0.928-10.875-2.681l-149.407-78.555c-1.231-0.645-2.576-0.965-3.925-0.965
		c-1.349,0-2.698,0.32-3.924,0.965L152.674,579.47c-7.739,4.063-17.628,3.351-24.688-1.787c-7.157-5.197-10.808-14.181-9.294-22.901
		l28.512-166.369c0.468-2.732-0.438-5.526-2.424-7.461L23.904,263.106c-6.332-6.167-8.662-15.588-5.939-23.984
		c2.744-8.409,10.176-14.673,18.914-15.959l167.074-24.267c2.744-0.4,5.122-2.125,6.348-4.616l74.681-151.363
		c3.912-7.938,12.165-13.067,21.029-13.067c8.84,0,17.068,5.125,20.975,13.071l74.706,151.359c1.231,2.491,3.6,4.215,6.349,4.616
		l167.035,24.263c8.764,1.29,16.194,7.549,18.935,15.971C596.754,247.515,594.432,256.927,588.083,263.106z"/>
</g>
              </svg>
            <p>Important</p>
            </span>
          </span>
            <span className={'navbar__features__title'}>
            <span className={'navbar__features__title__container'}>
              <svg fill={'rgba(187,158,120,0.73)'} className={'navbar__features__task'}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g>
                  <path d="M10,4.5 C10,4.77614237 9.77614237,5 9.5,5 C9.22385763,5 9,4.77614237 9,4.5 C9,3.67157288 9.67157288,3 10.5,3 L13.5,3 C14.3284271,3 15,3.67157288 15,4.5 C15,4.77614237 14.7761424,5 14.5,5 C14.2238576,5 14,4.77614237 14,4.5 C14,4.22385763 13.7761424,4 13.5,4 L10.5,4 C10.2238576,4 10,4.22385763 10,4.5 Z M6.5,4 C6.77614237,4 7,4.22385763 7,4.5 C7,4.77614237 6.77614237,5 6.5,5 C5.67157288,5 5,5.67157288 5,6.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L17.5,20 C18.3284271,20 19,19.3284271 19,18.5 L19,6.5 C19,5.67157288 18.3284271,5 17.5,5 C17.2238576,5 17,4.77614237 17,4.5 C17,4.22385763 17.2238576,4 17.5,4 C18.8807119,4 20,5.11928813 20,6.5 L20,18.5 C20,19.8807119 18.8807119,21 17.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,6.5 C4,5.11928813 5.11928813,4 6.5,4 Z"/>
                  <path d="M15.1464466,9.14644661 C15.3417088,8.95118446 15.6582912,8.95118446 15.8535534,9.14644661 C16.0488155,9.34170876 16.0488155,9.65829124 15.8535534,9.85355339 L10.8535534,14.8535534 C10.6582912,15.0488155 10.3417088,15.0488155 10.1464466,14.8535534 L8.14644661,12.8535534 C7.95118446,12.6582912 7.95118446,12.3417088 8.14644661,12.1464466 C8.34170876,11.9511845 8.65829124,11.9511845 8.85355339,12.1464466 L10.5,13.7928932 L15.1464466,9.14644661 Z"/>
                </g>
              </svg>
            <p>Tasks</p>
            </span>
          </span>
          </div>
          <CardList/>
        </div>
        <span className={'navbar_add'} onClick={() => add()}>
          <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"/>
          </svg>
        <span className={'navbar_add__title'}>New list</span></span>
      </div>
    </div>

    : <span>Гружусь...</span>
};

export default Navbar;