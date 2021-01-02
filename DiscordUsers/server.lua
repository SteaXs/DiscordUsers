AddEventHandler('es:playerLoaded',function(source)
  CreateThread(function()
    Wait(1000)
    local license,discord
    local playername = GetPlayerName(source)

    for k,v in ipairs(GetPlayerIdentifiers(source))do
      if string.sub(v, 1, string.len("license:")) == "license:" then
        license = v
      elseif string.sub(v, 1, string.len("discord:")) == "discord:" then
        discord = v
      end
    end

    MySQL.Async.fetchAll('SELECT * FROM `users` WHERE `license` = @license', {
      ['@license'] = license
    }, function(data)
    local found = false
      for i=1, #data, 1 do
        if data[i].license == license then
          found = true
        end
      end
      if not found then
        MySQL.Async.execute('INSERT INTO users (discord) VALUES (@discord)', 
          { 
          ['@discord']    = discord
          },
          function ()
        end)
      else
        MySQL.Async.execute('UPDATE `users` SET `discord` = @discord WHERE `license` = @license', 
          { 
          ['@license']    = license,
          ['@discord']    = discord
          },
          function ()
        end)
      end
    end)
  end)
end)