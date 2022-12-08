import { Util } from '../util/util';
import { CommandError } from '../util/CommandError';

export default {
  name: 'tempkick',
  description: 'プレイヤーを強制退出させます(復帰可能なkick)',
  args: [ '<name: playerName> [reason: string] [expects: boolean]' ],
  aliases: [],
  permission: (player) => Util.isOP(player),
  func: (sender, args) => {
    const [ playerName, reason, expect ] = args;
    if (!playerName) throw new CommandError('プレイヤー名を入力してください');
    const player = Util.getPlayerByName(playerName, expect === 'true');
    if (!player) throw new CommandError(`プレイヤー: ${playerName} が見つかりませんでした`);
    if (sender.name === player.name) throw new CommandError('自分をkickすることはできません');
    player.triggerEvent('tn:kick');
    Util.notify(`${sender.name} >> プレイヤー: §c${player.name}§r をtempkickしました(再参加できます)\n§7Reason: §r${reason}`);
  }
}