import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api_key from '../config';

export const fetchWeatherAction = createAsyncThunk(
  'weather/fetchWeather',
  async (payload, { rejectWithValue, getState, dispatch }) => {
    if (typeof(payload) === "string") {
      try {
        const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${payload}&units=imperial&appid=${api_key}`);
        const city = await res.json();
  
        const forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${city[0].lat}&lon=${city[0].lon}&units=imperial&appid=${api_key}`);
        return await forecast.json();
      } catch (err) {
        if (!err?.response) {
          throw err;
        }
        return rejectWithValue(err?.response?.data);
      }
    } else {
      try {
        const forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&units=imperial&appid=${api_key}`);
        return await forecast.json();
      } catch (err) {
        if (!err?.response) {
          throw err;
        }
        return rejectWithValue(err?.response?.data);
      }
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
      state.weather = action?.payload;
      state.loading = false;
      state.error = undefined;
    })
    builder.addCase(fetchWeatherAction.rejected, (state, action) => {
      state.loading = false;
      state.weather = undefined;
      state.error = action?.payload;
    })
  }
});

export default weatherSlice.reducer;