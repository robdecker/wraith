require 'wraith'
require 'image_size'

class Wraith::CropImages
  attr_reader :wraith

  def initialize(config)
    @wraith = Wraith::Config.new(config)
  end

  def crop
    crop_value(base_height, compare_height, @compare, @base)
  end

  def height
    crop_value(base_height, compare_height, base_height, compare_height)
  end

  def base_height
    find_heights(@base)
  end

  def compare_height
    find_heights(@compare)
  end

  def crop_images
    files = Dir.glob("#{wraith.directory}/*/*.png").sort
    until files.empty?
      @base, @compare = files.slice!(0, 2)
      puts 'cropping images'
      crop_task(crop, height)
    end
  end

  def crop_value(base_height, compare_height, arg3, arg4)
    if base_height > compare_height
      arg3
    else
      arg4
    end
  end

  def find_heights(height)
    File.open(height, 'rb') do |fh|
      size = ImageSize.new(fh.read).size
      height = size[1]
    end
  end

  def crop_task(crop, height)
    # For compatibility with windows file structures switch commenting on the following 2 lines
    puts `convert #{crop} -background none -extent 0x#{height} #{crop}`
    # puts `convert #{crop.gsub('/', '\\')} -background none -extent 0x#{height} #{crop.gsub('/', '\\')}`
  end
end