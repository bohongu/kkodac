export function replaceAll(str: string, searchStr: any, replaceStr: any) {
  return str.split(searchStr).join(replaceStr);
}

export function makeHyphenUuid(noHyphenUuid: string) {
  const hyphenUuid = [];
  hyphenUuid.push(noHyphenUuid.slice(0, 8));
  hyphenUuid.push(noHyphenUuid.slice(8, 12));
  hyphenUuid.push(noHyphenUuid.slice(12, 16));
  hyphenUuid.push(noHyphenUuid.slice(16, 20));
  hyphenUuid.push(noHyphenUuid.slice(20, 32));

  const uuid = hyphenUuid.join('-');
  return uuid;
}

export function makeValidatedUuid(uuid: string) {
  return makeHyphenUuid(replaceAll(uuid, '-', '').toLowerCase());
}

export function binaryToUuid(binary: Buffer | string) {
  return makeHyphenUuid(binary.toString('hex'));
}

export function uuidToBinary(uuid: string) {
  return Buffer.from(replaceAll(uuid, '-', ''), 'hex');
}
