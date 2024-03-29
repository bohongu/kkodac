import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { svgVariants } from '../../utils/variants';
import { useQuery } from 'react-query';
import { getWeather } from '../../api/api';
import LoadingSpinner from '../ui/LoadingSpinner';
import logo from '../../assets/images/logo2.png';
import background from '../../assets/images/background.png';
import sun from '../../assets/images/weather/sun.png';
import partSun from '../../assets/images/weather/partSun.png';
import cloud from '../../assets/images/weather/cloud.png';
import rain from '../../assets/images/weather/rain.png';
import shower from '../../assets/images/weather/shower.png';
import snow from '../../assets/images/weather/snow.png';
import thunder from '../../assets/images/weather/thunder.png';
import mist from '../../assets/images/weather/mist.png';

interface IWeatherArray {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: IWeatherArray[];
  main: {
    temp: number;
  };
}

const Map = () => {
  const lat = 33.511;
  const lon = 126.964;

  /* React-Query */
  const { data: weatherData, isLoading } = useQuery<IWeather | undefined>(
    'weather',
    () => getWeather(lat, lon),
  );
  let celsius;

  if (weatherData) {
    celsius = Math.round(weatherData.main?.temp - 273.15);
  }

  const selectIcon = () => {
    let id;
    if (weatherData) {
      id = weatherData.weather[0].icon.substring(0, 2);
    }
    switch (id) {
      case '01':
        return <WeatherIcon alt="sun" src={sun} />;
      case '02':
        return <WeatherIcon alt="partSun" src={partSun} />;
      case '03':
        return <WeatherIcon alt="cloud" src={cloud} />;
      case '04':
        return <WeatherIcon alt="cloud" src={cloud} />;
      case '09':
        return <WeatherIcon alt="rain" src={rain} />;
      case '10':
        return <WeatherIcon alt="shower" src={shower} />;
      case '11':
        return <WeatherIcon alt="thunder" src={thunder} />;
      case '13':
        return <WeatherIcon alt="snow" src={snow} />;
      case '50':
        return <WeatherIcon alt="mist" src={mist} />;
    }
  };

  return (
    <>
      <Logo>
        <img alt="logo" src={logo} />
      </Logo>
      <Weather>
        {isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <span>지금 제주는</span>
            <Icon>{selectIcon()}</Icon>
            <Temp>{celsius}&#8451;</Temp>
          </>
        )}
      </Weather>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600">
        <Link to="/tour/대정면">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M145.39,378.11l3.87-2.13c.59-.32,1.21-.58,1.86-.77l10.46-3.09c2.12-.63,4.4-.48,6.43,.42l15.78,6.99c2.82,1.25,6.07,1.03,8.69-.59l.57-.35c2.2-1.36,3.74-3.57,4.25-6.11l1.03-5.16c.23-1.14,.66-2.22,1.29-3.2l2.39-3.74c1.41-2.21,3.69-3.73,6.28-4.17l10.28-1.78c3.23-.56,6.52,.62,8.66,3.1l8.14,9.45c.31,.37,.6,.75,.86,1.16l5.11,8.22c.83,1.33,1.31,2.85,1.39,4.41l.25,4.58c.06,1.14-.08,2.28-.43,3.36l-7.7,24.05c-.9,2.82-.41,5.9,1.32,8.3l3.92,5.44c.53,.74,1.18,1.4,1.9,1.96l5.68,4.34c.95,.72,1.75,1.62,2.36,2.65l1.11,1.87c1.6,2.69,1.74,6,.38,8.82l-3.99,8.28c-.08,.16-.16,.32-.25,.47l-8.83,15.93c-.62,1.12-1.46,2.1-2.47,2.88l-6.1,4.69c-2.98,2.29-7.04,2.57-10.31,.72l-5.09-2.89c-1.21-.69-2.24-1.63-3.04-2.77l-8.94-12.8c-.32-.45-.59-.93-.82-1.43l-5.67-12.27c-.82-1.78-2.18-3.25-3.88-4.21l-16.14-9.13c-.5-.28-.98-.62-1.42-.99l-23.59-19.89c-.24-.2-.47-.42-.69-.65l-11.29-11.68c-1.53-1.59-2.46-3.67-2.6-5.87h0c-.45-6.75,3.05-13.16,8.99-16.42Z"
          />
          <text transform="translate(178.71 417.42)">
            <Region x="0" y="0">
              대정면
            </Region>
          </text>
        </Link>
        <Link to="/tour/한경면">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M142.87,376.77l15.67-7.17c.2-.09,.41-.16,.63-.19l9.99-1.52c.51-.08,1.03,.01,1.48,.25l14.51,7.76c1.09,.58,2.45,.23,3.12-.81l10.82-16.77c.2-.3,.46-.56,.77-.75l10.52-6.35c.39-.24,.84-.36,1.3-.34l13.29,.4c1.13,.03,2.12-.73,2.39-1.83l3.32-13.9c.06-.26,.17-.5,.31-.72l7.93-12.47c.2-.31,.47-.57,.78-.76l8.1-4.86c.67-.4,1.1-1.11,1.15-1.89l.77-11.88c.07-1.08-.6-2.08-1.63-2.41l-12.16-3.99c-.52-.17-1.09-.16-1.61,.04l-13.45,5.24-15.12,5.9c-.22,.09-.45,.14-.69,.16l-12.25,.91c-.28,.02-.56,0-.84-.09l-21.15-6.11c-.11-.03-.21-.07-.31-.12l-16.36-7.35c-.09-.04-.19-.08-.29-.11l-6.26-1.9c-.94-.29-1.96,.04-2.56,.81l-13.47,17.22c-.17,.21-.3,.46-.38,.71l-5.94,17.82c-.13,.4-.16,.84-.07,1.25l3.33,15.56c.1,.46,.33,.88,.67,1.21l7.63,7.43c.5,.48,.76,1.16,.72,1.85l-.94,15.43c-.2,3.34,3.23,5.69,6.27,4.3Z"
          />
          <text transform="translate(155.71 335.42)">
            <Region x="0" y="0">
              한경면
            </Region>
          </text>
        </Link>
        <Link to="/tour/안덕면">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M230.94,352.87l4.17-18.56c.17-.76,.51-1.48,1-2.09l8.86-11.07c.4-.5,.88-.92,1.44-1.24l8.76-5.09c.62-.36,1.17-.85,1.59-1.44l10.12-14.01c.19-.26,.41-.51,.65-.74l9.98-9.4c.79-.75,1.8-1.22,2.88-1.36l6.05-.77c.77-.1,1.55-.02,2.28,.22l15.21,5.08c.2,.07,.39,.14,.58,.24l9.58,4.56c.56,.27,1.16,.43,1.78,.48l12.21,1.04c.53,.05,1.06,0,1.58-.11l11.97-2.71,7.02-1.51c3.2-.69,6.23,1.74,6.23,5.02h0c0,.16,0,.31-.02,.47l-.79,8.99c-.03,.31-.03,.62,0,.93l.92,9.85c.04,.38,.11,.75,.23,1.11l3.19,9.85c.35,1.09,.33,2.27-.06,3.35l-1.3,3.58c-.52,1.42-1.63,2.54-3.05,3.07l-5.78,2.14c-.76,.28-1.59,.38-2.4,.28l-8.13-.96c-.68-.08-1.36-.02-1.98,.15-1.88,.52-3.38,2.1-3.71,4.14l-2.63,16.2-2.21,20.23-2,17.47c-.03,.26-.04,.51-.03,.77l.66,18.41c0,.16,.02,.33,.04,.49l1.16,8.81c.48,3.65-2.91,6.61-6.47,5.64l-13.27-3.63c-.44-.12-.9-.18-1.36-.18h-20.62c-.52,0-1.05,.08-1.55,.24l-19.66,6.18c-.44,.14-.86,.34-1.25,.59l-.64,.41c-2.28,1.47-5.31,.92-6.92-1.25l-7.61-10.22c-.26-.35-.57-.67-.91-.95l-6.56-5.25c-1.41-1.13-2.12-2.91-1.89-4.69l1.22-9.24c.07-.53,.22-1.05,.45-1.54l6.27-13.18c.33-.69,.5-1.44,.5-2.2l.02-7.46c0-.93-.25-1.84-.72-2.64l-7.34-12.39c-.06-.11-.13-.21-.2-.32l-6.76-9.72c-.82-1.19-1.11-2.66-.8-4.07Z"
          />
          <text transform="translate(269.71 363.42)">
            <Region x="0" y="0">
              안덕면
            </Region>
          </text>
        </Link>
        <Link to="/tour/중문">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M374.97,456.02l2.69-16.9s.01-.07,.02-.11l7.81-33.78,5.68-23.21c.07-.27,.06-.56-.02-.83l-7.24-24.69c-.08-.26-.22-.5-.41-.69l-11.53-11.37c-.27-.26-.62-.42-.99-.45l-11.54-.94c-.3-.02-.6,.04-.87,.17l-7.74,4.02c-.23,.12-.49,.18-.76,.18l-12.49-.15c-.8,0-1.48,.57-1.6,1.36l-2.86,19.19-3.9,27.11c0,.06-.01,.12-.02,.18l-.5,16.59c0,.1,0,.2,.02,.29l3.43,22.2c.08,.49,.37,.92,.81,1.16l39.66,21.81c.97,.53,2.17-.06,2.35-1.15Z"
          />
          <text transform="translate(345.71 396.42)">
            <Region x="0" y="0">
              중문
            </Region>
          </text>
        </Link>
        <Link to="/tour/서귀포">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M479.01,451.3l1.77-12.62c.27-1.92-.29-3.87-1.53-5.35l-6.52-7.78c-.79-.95-1.32-2.09-1.51-3.31l-1.33-8.22c-.05-.3-.08-.61-.09-.92l-.79-31.61c-.03-1.26-.41-2.49-1.1-3.55l-14.22-21.95c-.25-.38-.45-.78-.62-1.2l-12.33-31.16-3.46-8.58c-.72-1.79-2.16-3.19-3.97-3.86l-20.49-7.61c-.31-.12-.62-.26-.91-.42l-25.21-13.84c-.24-.13-.47-.27-.68-.43l-9.04-6.46c-3.28-2.34-7.85-1.36-9.89,2.11l-6.47,11.02c-.41,.69-.69,1.46-.83,2.25l-2.33,12.89c-.22,1.23-.1,2.51,.35,3.68l5.41,14.06c.46,1.2,.58,2.5,.33,3.75h0c-.73,3.79,1.81,7.43,5.62,8.05l5.25,.86c1.62,.27,3.1,1.11,4.15,2.37l4.9,5.86c.45,.54,.82,1.16,1.09,1.81l11.02,27.1c.53,1.3,.65,2.73,.33,4.1l-16.58,72.76c-.75,3.29,1.01,6.64,4.14,7.89l15.55,6.19c.34,.14,.7,.25,1.06,.33l19.81,4.37c1.09,.24,2.22,.21,3.29-.08l34.4-9.44c.34-.09,.68-.21,1-.36l16.47-7.41c2.15-.97,3.65-2.97,3.97-5.3Z"
          />
          <text transform="translate(405.56 383.42)">
            <Region x="0" y="0">
              서귀포
            </Region>
          </text>
        </Link>
        <Link to="/tour/남원읍">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M529.16,305.48l5.29,14.33c.25,.66,.64,1.26,1.15,1.75l23.13,22.2c.46,.44,.82,.97,1.07,1.56l4.71,11.18c.13,.32,.23,.66,.29,1l4.43,24.97c.07,.4,.19,.79,.37,1.16l6.31,13.5c.35,.75,.49,1.57,.42,2.39l-1.52,17.15c-.02,.17-.04,.34-.07,.51l-2.99,14.84c-.36,1.77-1.71,3.18-3.47,3.61l-46.99,11.51-14.53,3.23c-.22,.05-.44,.08-.66,.1l-16.52,1.24c-2.74,.21-5.07-1.99-5.02-4.74l.21-11.63c.02-1.12-.36-2.21-1.08-3.07l-8.46-10.18c-.65-.78-1.02-1.75-1.07-2.76l-2.01-41.11c-.04-.82-.3-1.62-.75-2.31l-14.61-22.53c-.16-.24-.29-.49-.4-.76l-15.83-38.29c-.12-.29-.21-.6-.27-.91h0c-.55-2.91,1.71-5.6,4.68-5.54l38.4,.71c.4,0,.8-.04,1.19-.13l25.25-6.15c.39-.1,.79-.14,1.19-.13l13.87,.26c1.92,.04,3.63,1.25,4.3,3.05Z"
          />
          <text transform="translate(489.71 376.42)">
            <Region x="0" y="0">
              남원읍
            </Region>
          </text>
        </Link>
        <Link to="/tour/표선면">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M535.58,306.35c-.93-3.65,.68-7.47,3.95-9.34l14.62-8.39,23.9-12.87c1.22-.66,2.59-1,3.97-1h8.74c1.12,0,2.23,.23,3.27,.66l22.87,9.67c.88,.37,1.82,.59,2.77,.65h0c4.04,.24,7.34,3.33,7.83,7.35l.94,7.69c.02,.16,.03,.31,.04,.47l.97,14.83c.11,1.69-.3,3.38-1.17,4.84l-9.7,16.26c-.13,.22-.25,.44-.36,.67l-3.66,7.63c-1.31,2.73-1.05,5.95,.69,8.43l.92,1.32c1.31,1.87,3.32,3.12,5.57,3.47l13.05,2.05c.18,.03,.37,.05,.55,.07l13.45,1.21c1.19,.11,2.34,.46,3.37,1.05l14.46,8.17,7.54,4.31c3.91,2.24,5.36,7.16,3.27,11.16l-1.34,2.57c-.08,.15-.16,.3-.25,.44l-17.64,29.3c-.71,1.19-1.71,2.18-2.9,2.88l-22.65,13.46c-.52,.31-1.06,.56-1.63,.75l-8.13,2.71c-1.41,.47-2.92,.56-4.37,.25l-16.55-3.46c-.25-.05-.51-.09-.77-.12l-11.62-1.32c-.7-.08-1.41-.07-2.11,.03l-.61,.08c-5.84,.82-10.68-4.5-9.32-10.24l1.23-5.17c.06-.27,.12-.55,.15-.83l1.6-12.01c.08-.62,.1-1.25,.04-1.88l-.65-7.06c-.09-.95-.34-1.89-.74-2.75l-5.78-12.46c-.3-.65-.52-1.34-.65-2.05l-5.13-28.57c-.25-1.39-.85-2.7-1.74-3.8l-8.14-10.04c-.26-.32-.54-.62-.84-.89l-15.97-14.67c-1.2-1.1-2.05-2.52-2.45-4.1l-2.91-11.4Z"
          />
          <text transform="translate(570.71 363.42)">
            <Region x="5" y="10">
              표선면
            </Region>
          </text>
        </Link>
        <Link to="/tour/성산읍">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M632.56,291.94l2.03,13.34c.05,.34,.07,.68,.07,1.02l-.24,13.45c-.02,1.22-.41,2.41-1.12,3.4l-10.89,15.27c-.14,.2-.27,.4-.38,.61l-3.31,6.05c-.9,1.64-.99,3.61-.23,5.32l.41,.94c.83,1.91,2.59,3.25,4.65,3.56l16.45,2.45,15.72,2.47c.82,.13,1.6,.42,2.3,.86l14.02,8.88c.13,.08,.25,.17,.37,.26l6.88,5.11c2,1.48,4.69,1.59,6.8,.28l15.58-9.71c.18-.11,.34-.23,.51-.35l20.35-15.78,17.52-14.69c.46-.39,.87-.84,1.19-1.35l8.19-12.69,4.33-7.15c2.39-3.95,8.15-3.87,10.43,.15h0c.16,.28,.29,.56,.4,.86l.32,.86c.95,2.54,3.49,4.14,6.19,3.9l2.99-.26c2.98-.26,5.32-2.67,5.51-5.65l.16-2.64c.05-.84-.07-1.68-.37-2.47l-5.52-14.9c-.04-.11-.08-.21-.13-.31l-4.2-9.65c-.59-1.36-.66-2.88-.2-4.29l3.21-9.82c.28-.86,.75-1.64,1.37-2.3l7.14-7.49c2.04-2.14,5.33-2.49,7.78-.82l5.13,3.49c.48,.33,.91,.72,1.28,1.17l2.44,2.99c1.28,1.56,3.26,2.39,5.27,2.19l.43-.04c1.36-.13,2.63-.72,3.61-1.67l6.24-6.02c.25-.24,.48-.5,.68-.78l1.08-1.48c.82-1.13,1.23-2.5,1.16-3.89l-.21-3.89c-.06-1.18-.47-2.31-1.16-3.26l-8.89-12.11c-1.06-1.44-2.7-2.34-4.48-2.45l-5.03-.32c-.56-.04-1.12,0-1.67,.12l-12.47,2.71c-1.02,.22-2.08,.17-3.08-.14l-4.96-1.55c-1.33-.42-2.77-.36-4.07,.17l-22.94,9.28-38.23,14.6c-.2,.08-.4,.17-.59,.26l-20.9,10.68c-.24,.12-.49,.23-.74,.32l-37.74,13.27c-.2,.07-.4,.13-.6,.18l-11.25,2.7c-3.06,.73-5.04,3.68-4.57,6.79Z"
          />
          <text transform="translate(683.71 309.42)">
            <Region x="0" y="0">
              성산읍
            </Region>
          </text>
        </Link>
        <Link to="/tour/우도면">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M824.49,206.42l11.44-18.54c.18-.29,.31-.61,.37-.95l3.94-19.84c.09-.46,.29-.89,.59-1.25l8.37-10.29c.4-.49,.96-.84,1.58-.98l7.56-1.75c1.12-.26,2.29,.18,2.97,1.11l2.86,3.95c.43,.6,.62,1.33,.52,2.06l-.35,2.62c-.02,.18-.03,.36-.02,.54l.44,7.85c0,.05,0,.11,0,.16v2.75c0,2.29,2.56,3.66,4.46,2.38h0c1.21-.81,2.82-.59,3.77,.51l1.04,1.21c.41,.48,.65,1.07,.69,1.7l.09,1.53c.05,.91-.33,1.8-1.04,2.38l-2.46,2.03c-.8,.66-1.18,1.7-1,2.72l.63,3.45,2.24,9.52,1.63,8.21c.1,.5,.06,1.02-.11,1.51l-2.72,7.76c-.36,1.01-1.24,1.74-2.31,1.89-3.68,.52-12.02,1.61-13.13,1.07-1.29-.63-15.98-1.64-18.8-1.83-.31-.02-.62-.09-.9-.21l-8.88-3.69c-.72-.3-1.29-.88-1.57-1.6l-2.13-5.42c-.33-.84-.24-1.78,.23-2.55Z"
          />
          <text transform="translate(829.71 206.42)">
            <Region x="7" y="0">
              우도
            </Region>
          </text>
        </Link>
        <Link to="/tour/구좌읍">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M611.39,136.19l1.26,26.9c.02,.33,.05,.65,.11,.97l4.84,25.63c.06,.3,.09,.6,.11,.91l1.08,19.23c0,.12,.02,.25,.03,.37l1.65,14.98c.13,1.14-.03,2.29-.46,3.36l-3,7.5c-.29,.73-.7,1.4-1.21,1.99l-11.06,12.74c-.28,.33-.6,.63-.93,.89l-3,2.38c-1.22,.96-2.08,2.3-2.44,3.81l-1.89,7.71c-.77,3.13,.71,6.39,3.57,7.87l10.43,5.41c.36,.19,.73,.34,1.12,.46l14.38,4.53c1.39,.44,2.88,.43,4.26-.02l28.15-9.15,22.76-8.26c.18-.07,.36-.14,.53-.22l24.57-11.28c.17-.08,.33-.15,.5-.21l56.71-20.86c4.03-1.48,5.79-6.22,3.69-9.97h0c-1.31-2.33-1.16-5.21,.36-7.4l5.58-8.02c.55-.8,1.27-1.47,2.1-1.98l3.62-2.2c1.74-1.06,2.93-2.83,3.26-4.84l.25-1.51c.34-2.09-.28-4.22-1.7-5.79l-12.05-13.42c-.26-.29-.55-.56-.85-.8l-12.6-10.01c-.94-.75-2.06-1.24-3.24-1.43l-10.92-1.75c-1.51-.24-2.89-.97-3.95-2.07l-9.26-9.7c-.66-.69-1.17-1.51-1.5-2.41l-2.12-5.73c-1.09-2.95-4.01-4.81-7.14-4.54l-16.77,1.4c-.15,.01-.3,.03-.44,.05l-14.45,2.14c-1.09,.16-2.2,.06-3.25-.29l-24.19-8.12c-.16-.06-.33-.1-.5-.15l-19.57-4.98c-.41-.1-.83-.17-1.25-.2l-17.71-1.21c-4.17-.28-7.65,3.13-7.46,7.3Z"
          />
          <text transform="translate(662.71 212.42)">
            <Region x="0" y="0">
              구좌읍
            </Region>
          </text>
        </Link>
        <Link to="/tour/조천읍">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M514.82,124.55l7.87-4.21c1.08-.57,2.3-.79,3.51-.63l26.84,3.73c.12,.02,.23,.04,.35,.06l24.47,4.96c.48,.1,.98,.13,1.47,.11l21.07-1.19c3.43-.19,6.27,2.64,6.08,6.07l-.54,9.77c-.02,.31,0,.63,.02,.94l2.59,23.82c.01,.13,.03,.26,.06,.39l3.25,18.14c.06,.32,.09,.64,.09,.96l.17,17.44c0,.35,.04,.7,.11,1.05l2.48,12.71c.06,.29,.09,.59,.1,.88l.29,7.55c.03,.92-.15,1.84-.55,2.68l-4.79,10.15c-.42,.89-1.06,1.66-1.86,2.23l-9.9,7.07c-.85,.61-1.52,1.43-1.94,2.39l-4.21,9.68c-.32,.73-.48,1.51-.48,2.3v2.14c0,2.94-2.22,5.42-5.15,5.73l-11.28,1.21c-.86,.09-1.68,.38-2.42,.83l-16.08,9.94c-.26,.16-.54,.3-.82,.42l-18.25,7.56c-.67,.28-1.29,.68-1.81,1.19l-3.7,3.59c-1,.97-2.31,1.54-3.7,1.62l-20.24,1.1c-.33,.02-.66,.06-.98,.14l-20.65,4.74c-.35,.08-.7,.13-1.05,.14l-29.63,1.22h0c-5.04,.2-7.89-5.72-4.59-9.53l4.26-4.91c.57-.65,.98-1.42,1.2-2.26l2.96-10.86c.27-1.01,.82-1.92,1.57-2.64l12.39-11.91c.09-.08,.17-.16,.26-.24l9.27-7.87,9.16-7.55,11.79-9.87c.23-.19,.44-.4,.64-.63l21.18-24.27c.38-.44,.7-.94,.93-1.47l6.3-14.33c.44-1,.59-2.11,.42-3.19l-1.99-13.02c-.11-.72-.35-1.41-.72-2.04l-9.38-16.09-8.52-15.13c-.11-.2-.22-.41-.31-.63l-2.7-6.54c-.35-.85-.49-1.78-.42-2.7l.57-6.65c.12-1.44,.79-2.79,1.86-3.76l1.89-1.72c.35-.32,.75-.6,1.17-.83Z"
          />
          <text transform="translate(535.71 227.42)">
            <Region x="0" y="0">
              조천읍
            </Region>
          </text>
        </Link>
        <Link to="/tour/제주시">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M356.21,164.47l27.57-17.98c.23-.15,.49-.24,.77-.27l31.01-3.02,27.64-3.38c.05,0,.11-.01,.16-.01l28.56-.8s.07,0,.1,0l23.46-2.05c.33-.03,.65-.15,.91-.36l6.98-5.52c1.09-.86,2.7-.13,2.77,1.26l.32,6.67,.46,6.76c.02,.22,.07,.44,.17,.64l4.43,9.02c.06,.13,.14,.24,.23,.35l4.21,4.96c.11,.13,.2,.28,.27,.44l2.57,6.05c.04,.11,.1,.21,.16,.3l5.1,7.42c.08,.12,.15,.24,.19,.38l3.08,8.32c.04,.12,.08,.24,.09,.37l1.07,8.07c.02,.19,.02,.38-.02,.57l-1.82,8.93c-.04,.2-.12,.39-.22,.56l-5.86,9.41c-.07,.11-.15,.21-.23,.3l-11.15,11.31-10.57,11.85c-.05,.05-.09,.1-.15,.14l-12.17,10.73-7.74,7.58-8.29,8.13c-.06,.06-.13,.12-.2,.17l-7.73,5.57c-.15,.11-.28,.24-.39,.38l-7.74,10.68c-.1,.14-.18,.3-.24,.46l-2.58,7.73c-.05,.16-.13,.31-.23,.45l-8.37,11.84s-.04,.05-.06,.08h0c-1.16,1.45-3.47,.28-2.99-1.51l4.4-16.32c.05-.17,.07-.35,.06-.52l-.93-20.69c0-.17-.04-.35-.1-.51l-8.09-22.2c-.14-.39-.42-.71-.78-.91l-10.8-5.99c-.06-.03-.11-.07-.16-.1l-13.75-9.8c-.13-.09-.24-.2-.34-.32l-13.39-16.74-11.58-14.44c-.12-.15-.27-.28-.44-.39l-12.32-7.58-12.1-6.82c-.31-.17-.56-.44-.71-.76l-3.16-6.7c-.36-.77-.1-1.7,.61-2.16Z"
          />
          <text transform="translate(434.71 198.42)">
            <Region x="0" y="0">
              제주시
            </Region>
          </text>
        </Link>
        <Link to="/tour/애월읍">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M242.76,209.78l2.04-7.91c.3-1.15,.91-2.18,1.78-2.99l8.26-7.67c.81-.76,1.82-1.28,2.9-1.51l28.22-6.07,29.88-7.31c.21-.05,.42-.09,.64-.12l19.93-2.7c.73-.1,1.44-.33,2.09-.68l6.64-3.56c3.05-1.64,6.85-.45,8.42,2.63h0c.44,.85,1.07,1.59,1.84,2.16l7.34,5.4,9.63,6.47c.11,.08,.22,.15,.33,.24l8.59,6.63c.27,.21,.52,.43,.75,.68l7.85,8.43c.32,.34,.6,.72,.83,1.13l5.89,10.23c.34,.59,.77,1.11,1.28,1.56l9.61,8.45c.15,.13,.3,.25,.46,.37l14.22,10.27,8.66,6.42c.85,.63,1.53,1.47,1.96,2.44l3.7,8.29c.2,.44,.34,.91,.43,1.39l2.44,13.1,2.05,9.18c.23,1.04,.19,2.12-.12,3.14l-2.67,8.8c-.05,.17-.09,.34-.13,.51l-1.44,6.76c-.08,.35-.12,.71-.13,1.08l-.05,1.55c-.13,3.85-3.71,6.64-7.47,5.83l-9.41-2.02c-.37-.08-.73-.19-1.08-.34l-16.41-6.84c-.27-.11-.54-.25-.79-.4l-15.41-9.21-12.19-7.93c-2.82-1.83-6.58-1.08-8.48,1.7l-2.15,3.15c-.28,.42-.52,.87-.69,1.34l-1.79,4.87c-.81,2.19-2.78,3.74-5.11,4l-16.96,1.91c-2.89,.33-5.62-1.41-6.55-4.17l-5.14-15.3-5.49-19.46c-.49-1.75-1.73-3.2-3.39-3.95l-72.2-32.81c-2.73-1.24-4.18-4.26-3.43-7.17Z"
          />
          <text transform="translate(328.71 232.42)">
            <Region x="0" y="0">
              애월읍
            </Region>
          </text>
        </Link>
        <Link to="/tour/한림읍">
          <Path
            variants={svgVariants}
            initial="start"
            animate="end"
            whileHover="hover"
            d="M235.59,219.12c1.66-1.09,3.77-1.25,5.58-.44l50.64,22.68,24.69,12.26c1.52,.76,2.64,2.14,3.06,3.78l2.97,11.64c.04,.15,.08,.3,.14,.45l6.14,17.85c1.24,3.62-1.27,7.43-5.08,7.72l-1.73,.13c-.88,.07-1.76-.07-2.58-.39l-26.23-10.32c-.74-.29-1.53-.43-2.32-.4l-11.67,.36c-1.63,.05-3.16,.78-4.22,2.01l-8.93,10.28-4.84,6.14c-3.06,3.88-9.26,2.44-10.29-2.39h0c-.47-2.2-2.16-3.93-4.35-4.45l-10.49-2.52c-1.29-.31-2.65-.17-3.85,.4l-19.28,9.11c-.49,.23-1,.39-1.53,.48l-12.92,2.15c-.86,.14-1.74,.09-2.58-.15l-18.36-5.3c-.27-.08-.53-.17-.78-.29l-12.76-5.75c-.35-.16-.72-.28-1.1-.37l-4.44-1.01c-4.46-1.02-6.07-6.53-2.86-9.79l18.07-18.34c.13-.14,.27-.27,.42-.39l27.26-22.72c.17-.14,.35-.28,.54-.4l33.69-22.03Z"
          />
          <text transform="translate(218.71 268.42)">
            <Region x="0" y="0">
              한림읍
            </Region>
          </text>
        </Link>
      </Svg>
    </>
  );
};

export default Map;

const Svg = styled(motion.svg)`
  width: 95vw;
  height: 85vh;
  background-image: url(${background});
  background-size: cover;
  margin-bottom: 50px;
`;

const Weather = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 90px;
  right: 120px;
  padding: 10px 15px;
  background: #95d5fd;
  border-radius: 10px;
  span {
    margin: 3px 0;
    font-weight: 600;
  }
`;

const Icon = styled.div`
  margin: 5px 0;
`;

const Temp = styled.div`
  font-size: 25px;
`;

const Path = styled(motion.path)`
  stroke: ${(props) => props.theme.colors.ivory};
  stroke-width: 3px;
  fill: ${(props) => props.theme.colors.green};
`;

const Region = styled(motion.tspan)`
  font: bolder 18px Syong;
  fill: black;
`;

const Logo = styled.div`
  position: absolute;
  top: 150px;
  left: 150px;
  width: 50px;
  height: 50px;
`;

const WeatherIcon = styled.img`
  display: flex;
  ${(props) => props.theme.flex.flexCenter}
  width: 80px;
  height: 80px;
  margin: 3px 0;
`;
