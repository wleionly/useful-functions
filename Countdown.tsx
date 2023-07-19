import React, { useEffect, useState, useRef } from 'react';
import styles from './Countdown.less';

export default function Countdown(props) {
  const { endTime, status } = props || {};
  const [time, setTime] = useState({});
  const timer = useRef(null);
  // 点击切换tab
  useEffect(() => {
    clearInterval(timer.current);
    if (status === 'available') {
      const countdownTime = endTime || undefined;
      startCountDown(countdownTime);
    }
  }, [endTime, status]);
  // 开启计时
  const startCountDown = (activityTime) => {
    // 清除倒计时
    if (activityTime) {
      clearInterval(timer.current);
      // 由于setInterval会在一秒之后才会第一次执行倒计时，导致切换tab后时间更新滞后，因此先调用一次getCountdown方法，即刻更新时间
      getCountdown(activityTime);
      timer.current = setInterval(() => {
        getCountdown(activityTime);
      }, 1000);
    } else {
      setTime(undefined);
    }
  };

  const getCurrentTime = () => {
    let nowtime = 0;
    nowtime = new Date().getTime();
    return nowtime;
  };

  const getCountdown = (activityTime) => {
    const nowtime = getCurrentTime();
    const lefttime = activityTime - nowtime; // 距离结束时间的毫秒数
    if (lefttime <= 0) {
      clearInterval(timer.current);
      setTime({
        show: false,
      });
      return;
    }
    const day = Math.floor(lefttime / (1000 * 60 * 60 * 24)); // 计算天
    const hour = Math.floor((lefttime / (1000 * 60 * 60)) % 24); // 计算小时
    const minute = Math.floor((lefttime / (1000 * 60)) % 60); // 计算分钟
    const second = Math.floor((lefttime / 1000) % 60); // 计算秒
    // 规范化数据形式，赋值给state以供页面显示
    // const reshapeDay = day <= 0 ? '00' : (day < 10 ? `0${day}` : `${day}`);
    let reshapeDay = '00';
    if (day < 10) {
      reshapeDay = `0${day}`;
    } else {
      reshapeDay = `${day}`;
    }
    setTime({
      show: true,
      day: reshapeDay,
      hour: hour < 10 ? `0${hour}` : String(hour),
      minute: minute < 10 ? `0${minute}` : String(minute),
      second: second < 10 ? `0${second}` : String(second),
    });
  };
  return (
    <>
      {status === 'CAN_USE' && time?.show && (
        <div className={styles.countdownInfo}>
          <span className={styles.info}>你有红包待使用 |</span>
          <div className={styles.countdown}>
            <div className={styles.time}>
              <span>{time?.day}</span>
            </div>
            <span>天</span>
            <div className={styles.time}>
              <span>{time?.hour}</span>
            </div>
            <span>时</span>
            <div className={styles.time}>
              <span>{time?.minute}</span>
            </div>
            <span>分</span>
            <div className={styles.time}>
              <span>{time?.second}</span>
            </div>
            <span>秒后失效</span>
          </div>
        </div>
      )}
    </>
  );
}
