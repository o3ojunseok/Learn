# 시,분,초 입력하면 모두 초로 환산해주는 프로그램
hour = int(input('시간 : '))
min = int(input('분 : '))
sec = int(input('초 : '))

allSec = hour * 60 * 60 + min * 60 + sec
print('{} 초'.format(format(allSec, ','))) # 3자리마다 콤마


# 