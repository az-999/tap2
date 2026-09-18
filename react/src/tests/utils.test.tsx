import Utils from '@/utils';

describe('Utils', () => {
  it('Utils:formatNumber', () => {
    expect(Utils.formatNumber(1234567890002300)).toEqual('1.2Q');
    expect(Utils.formatNumber(1234567890000)).toEqual('1.2T');
    expect(Utils.formatNumber(1234567890)).toEqual('1.2Bn');
    expect(Utils.formatNumber(1004000)).toEqual('1M');
    expect(Utils.formatNumber(1000000)).toEqual('1M');
    expect(Utils.formatNumber(999999)).toEqual('1000K');
    expect(Utils.formatNumber(999)).toEqual(999);
    expect(Utils.formatNumber(100)).toEqual(100);
    expect(Utils.formatNumber(1)).toEqual(1);
    expect(Utils.formatNumber(-1)).toEqual(-1);
    expect(Utils.formatNumber(-1234567890)).toEqual(-1234567890);
  });

  it('Utils:formatTime', () => {
    expect(Utils.formatTime(1234567890)).toEqual('14288d:23h:31m');
    expect(Utils.formatTime(1004000)).toEqual('11d:14h:53m');
    expect(Utils.formatTime(1000000)).toEqual('11d:13h:46m');
    expect(Utils.formatTime(999999)).toEqual('11d:13h:46m');
    expect(Utils.formatTime(999)).toEqual('00h:16m:39s');
    expect(Utils.formatTime(100)).toEqual('00h:01m:40s');
    expect(Utils.formatTime(1)).toEqual('00h:00m:01s');
    expect(Utils.formatTime(-1)).toEqual('-1d:0-1h:0-1m');
    expect(Utils.formatTime(-1234567890)).toEqual('-14289d:0-24h:0-32m');
  });

  it('Utils:formatDailyTime', () => {
    expect(Utils.formatDailyTime(1234567890)).toEqual('342935h:31m');
    expect(Utils.formatDailyTime(13700)).toEqual('03h:48m');
    expect(Utils.formatDailyTime(10)).toEqual('00h:00m');
    expect(Utils.formatDailyTime(0)).toEqual('00h:00m');
    expect(Utils.formatDailyTime(-10)).toEqual('00h:00m');
  });

  it('Utils:getShortOwnerAddress', () => {
    expect(
      Utils.getShortOwnerAddress(
        'UQAV3yjC8gudxbhRBKFGdgbWpusRCJ0f0XNbfhxw-NupEvqz',
      ),
    ).toEqual('UQAV....Evqz');
    expect(Utils.getShortOwnerAddress('UQAV3yjC8g-NupEvqz')).toEqual(
      'UQAV....Evqz',
    );
    expect(Utils.getShortOwnerAddress('UpE')).toEqual('invalid address');
  });

  it('Utils:getShortNftAddress', () => {
    expect(
      Utils.getShortNftAddress(
        'UQAV3yjC8gudxbhRBKFGdgbWpusRCJ0f0XNbfhxw-NupEvqz',
      ),
    ).toEqual('UQAV3yjC8gud....fhxw-NupEvqz');
    expect(Utils.getShortNftAddress('UQAV3yjC8g-NupEvqz')).toEqual(
      'invalid address',
    );
    expect(Utils.getShortNftAddress('UpE')).toEqual('invalid address');
  });

  it('Utils:getFormattedDate', () => {
    expect(Utils.getFormattedDate(1725274580468)).toEqual('02.09.2024, 12:56');
    expect(Utils.getFormattedDate(172345678)).toEqual('03.01.1970, 02:52');
    expect(Utils.getFormattedDate(0)).toEqual('01.01.1970, 03:00');
    expect(Utils.getFormattedDate('test')).toEqual('Invalid Date');
    expect(Utils.getFormattedDate(undefined)).toEqual('Invalid Date');
    expect(Utils.getFormattedDate(NaN)).toEqual('Invalid Date');
  });
});
